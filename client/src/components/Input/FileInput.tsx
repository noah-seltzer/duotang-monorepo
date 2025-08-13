import localforage from 'localforage'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { FileCacheData } from '../../types/FileCacheData'
import { OneDriveIcon } from '../Icon/OneDriveIcon'
import { FolderIcon } from '../Icon/FolderIcon'
import { Picker } from '../OneDrive/Picker'
import { useMsal } from '@azure/msal-react'
import { Login } from '../Auth/Login'
import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Portal as DialogPortal
} from '@radix-ui/react-dialog'
import type { OneDrivePickedFileResult } from '../../types/OneDrivePickedFileResult'
import { fileDownloadRequest } from '../../data/auth-config'
interface FileInputProps {
    onChange?: (files: FileList | null) => void
    onSaved?: (fileIds: FileCacheData[]) => void
    title?: string
}

async function storeAllFiles(files: File[]) {
    const promises = files.map(async (file) => {
        const uuid = uuidv4()
        await localforage.setItem(uuid, file)
        return { id: uuid, name: file.name }
    })

    return Promise.all(promises)
}

export function FileInput({
    onChange,
    onSaved
}: FileInputProps): React.JSX.Element {
    const { instance } = useMsal()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const isLoggedIn = instance.getAllAccounts().length > 0

    const processFileSelected = (files: FileList | null) => {
        if (!files) return
        if (onChange) onChange(files)
        try {
            storeAllFiles(Array.from(files)).then((fileIds) => {
                if (onSaved) onSaved(fileIds)
            })
        } catch (err) {
            console.log('failed to store files', err)
        }
    }

    const processOnedriveFileSelected = async (
        command: OneDrivePickedFileResult
    ) => {
        const account = instance.getAllAccounts()[0]
        const files = await Promise.all(
            command.items.map(async (item) => {
                const token = await instance.acquireTokenPopup({
                    ...fileDownloadRequest,
                    account
                })
                const res = await fetch(
                    `https://graph.microsoft.com/v1.0/me/drive/items/${item.id}/content`,
                    {
                        headers: {
                            authorization: `Bearer ${token.accessToken}`
                        }
                    }
                )
                const blob = await res.blob()
                return new File([blob], item.name)
            })
        )
        return files
    }

    const onFilePicked = async (command: any) => {
        const files = await processOnedriveFileSelected(command)
        const fileIds = await storeAllFiles(files)
        if (onSaved) onSaved(fileIds)
    }

    return (
        <>
            <button
                className='btn btn-gray rounded-full'
                onClick={() => fileInputRef.current?.click()}
            >
                <FolderIcon />
            </button>
            <input
                type='file'
                ref={fileInputRef}
                onChange={(e) => processFileSelected(e.target.files)}
                multiple={true}
                hidden
            />
            {isLoggedIn ? (
                <>
                    <DialogRoot>
                        <DialogTrigger>
                            <OneDriveIcon />
                        </DialogTrigger>
                        <DialogPortal>
                            <Picker onPick={onFilePicked} />
                        </DialogPortal>
                    </DialogRoot>
                </>
            ) : (
                <Login />
            )}
        </>
    )
}
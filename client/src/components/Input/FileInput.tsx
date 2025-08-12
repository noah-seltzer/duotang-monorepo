import localforage from 'localforage'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { FileCacheData } from '../../types/FileCacheData'
import { OneDriveIcon } from '../Icon/OneDriveIcon'
import { FolderIcon } from '../Icon/FolderIcon'
import { Picker } from '../OneDrive/Picker'
import { useMsal } from '@azure/msal-react'
import { Login } from '../Auth/Login'
import { Root as DialogRoot, Trigger as DialogTrigger, Portal as DialogPortal } from "@radix-ui/react-dialog";
interface FileInputProps {
    onChange?: (files: FileList | null) => void
    onSaved?: (fileIds: FileCacheData[]) => void
    title?: string
}

async function storeAllFiles(files: FileList) {
    const promises = Array.from(files).map(async (file) => {
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
    const [showPicker, setShowPicker] = useState(false)

    const isLoggedIn = instance.getAllAccounts().length > 0

    const processFileSelected = (files: FileList | null) => {
        if (!files) return
        if (onChange) onChange(files)
        try {
            storeAllFiles(files).then((fileIds) => {
                if (onSaved) onSaved(fileIds)
            })
        } catch (err) {
            console.log('failed to store files', err)
        }
    }

    

    return (
        <>
            <button
                className='btn btn-gray rounded-full'
                onClick={() => fileInputRef.current?.click()}
            >
                {/* {title || 'Select File(s)'} */}
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
                            <button
                                
                                // onClick={() => setShowPicker(true)}
                                >
                                <OneDriveIcon />
                            </button>
                        </DialogTrigger>
                        <DialogPortal>
                            <Picker />
                        </DialogPortal>
                    </DialogRoot>
                    {/* {showPicker && <>
                        
                    </>
                    } */}
                </>
            ): <Login />}
        </>
    )
}

{/* <Picker /> */}
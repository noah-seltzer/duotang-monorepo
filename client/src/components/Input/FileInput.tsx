import localforage from 'localforage'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { FileCacheData } from '../../types/FileCacheData'

interface FileInputProps {
    onChange?: (files: FileList | null) => void
    onSaved?: (fileIds: FileCacheData[]) => void
    title?: string
}

async function storeAllFiles(files: FileList) {
    const promises = Array.from(files).map(async (file) => {
        const uuid = uuidv4()
        await localforage.setItem(uuid, file)
        return {id: uuid, name: file.name}
    })

    return Promise.all(promises)
}

export function FileInput({
    onChange,
    onSaved,
    title
}: FileInputProps): React.JSX.Element {
    
    const fileInputRef = useRef<HTMLInputElement>(null)
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
                className='btn btn-secondary'
                onClick={() => fileInputRef.current?.click()}
            >
                {title || 'Select File(s)'}
            </button>
            <input
                type='file'
                ref={fileInputRef}
                onChange={(e) => processFileSelected(e.target.files)}
                multiple={true}
                hidden
            />
        </>
    )
}

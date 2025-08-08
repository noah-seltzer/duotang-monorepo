import { useRef, type FC } from 'react'

interface FileInputProps {
    onChange: (files: FileList | null) => void
    title?: string
}

export const FileInput: FC<FileInputProps> = ({ onChange, title }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
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
                onChange={(e) => onChange(e.target.files)}
                multiple={true}
                hidden
            />
        </>
    )
}

import { useRef } from 'react'

interface FileInputProps {
    onChange: (files: FileList | null) => void
    title?: string
}

export function FileInput({ onChange, title }: FileInputProps): React.JSX.Element {
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

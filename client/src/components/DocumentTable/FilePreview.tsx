import { type FC } from 'react'

export const FilePreview: FC<{ files: File[] }> = ({ files }) => {
    if (!files || files.length === 0) return <>None</>
    return files.map((file) => <FilePreviewSquare file={file} />)
}

export const FilePreviewSquare: FC<{ file: File }> = ({ file }) => {
    const url = URL.createObjectURL(file)
    return <iframe src={url} width='100px' height='100px' title='pdf-viewer' />
}

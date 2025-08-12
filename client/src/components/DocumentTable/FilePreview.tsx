export function FilePreviews({ files }: { files: File[] }): React.JSX.Element {
    if (!files || files.length === 0) return <>None</>
    return (
        <div className='flex flex-row gap-2'>
            {files.map((file) => (
                <FilePreview file={file} />
            ))}
        </div>
    )
}

export function FilePreview({ file }: { file: File }): React.JSX.Element {
    const url = URL.createObjectURL(file)
    return <iframe src={url} width='100px' height='100px' title='pdf-viewer' />
}

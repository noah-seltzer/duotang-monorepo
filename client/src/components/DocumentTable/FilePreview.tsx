import { Suspense, use } from "react"
import localforage from 'localforage'

export function FilePreviews({ files }: { files: string[] }): React.JSX.Element {
    if (!files || files.length === 0) return <>None</>
    return (
        <div className='flex flex-row gap-2'>
            {files.map((file) => (
                <Suspense fallback={<div>Loading...</div>} >
                    <FilePreview filePromise={loadFile(file)} key={file} />
                </Suspense>
            ))}
        </div>
    )
}

async function loadFile(fileId: string): Promise<string> {
        const file = await localforage.getItem(fileId)
        return URL.createObjectURL(file as File)
}

function FilePreview({filePromise}: {filePromise: Promise<string>}) {
    const url = use(filePromise)
    return <iframe src={url} width='100px' height='100px' title='pdf-viewer' />
}
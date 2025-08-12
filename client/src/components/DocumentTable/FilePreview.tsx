'use client'
import { memo, Suspense, use } from 'react'
import localforage from 'localforage'
import type { FileInfo } from '../../types/FileInfo'

interface FilePreviewsProps {
    row: FileInfo
}

export function FilePreviews({ row }: FilePreviewsProps): React.JSX.Element {
    const fileIds = [
        ...(row?.fileIds?.map((f) => f.id) || []),
        ...(row?.maradFileIds?.map((f) => f.id) || [])
    ]
    if (fileIds.length === 0) return <>None</>
    return (
        <div className='flex flex-row gap-2'>
            {fileIds.map((file) => (
                <div key={file}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FilePreview filePromise={loadFile(file)} key={file} />
                    </Suspense>
                </div>
            ))}
        </div>
    )
}

async function loadFile(fileId: string): Promise<string> {
    const file = await localforage.getItem(fileId)
    return URL.createObjectURL(file as File)
}

function FilePreview({ filePromise }: { filePromise: Promise<string> }) {
    const url = use(filePromise)
    return <iframe src={url} width='100px' height='100px' title='pdf-viewer' />
}
export const FilePreviewsMemo = memo(FilePreviews)

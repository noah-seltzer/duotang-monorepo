import { createFileNamePreviews } from '../../util/file-names'
import type { ClientInfo } from '../../types/ClientInfo'
import type { FileInfo } from '../../types/FileInfo'
interface FileNamePreviewProps {
    fileInfo: FileInfo
    clientInfo: ClientInfo
    index: number
}

export function DisplayName({ name }: { name: string }) {
    const isOverflow = name.length > 20
    const displayName = isOverflow ? `${name.slice(0, 20)}...` : name
    return (
        <span title={name} className={isOverflow ? 'overflow' : ''}>
            {displayName}
        </span>
    )
}

/**
 * Displays the computed filenames the system will use on export of a file
 */
export function FileNamePreview({
    fileInfo,
    clientInfo,
    index
}: FileNamePreviewProps) {
    if (!fileInfo.file) return 'None'
    const maradFile = fileInfo.maradFile?.[0]
    const filenames = createFileNamePreviews(
        fileInfo.file,
        fileInfo.docType,
        clientInfo,
        index,
        maradFile
    )
    return (
        <div className='flex flex-col gap-1'>
            {filenames.map((name) => (
                <DisplayName name={name} />
            ))}
        </div>
    )
}

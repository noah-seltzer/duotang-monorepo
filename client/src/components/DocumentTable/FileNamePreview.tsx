import { createFileNamePreviews } from '../../util/file-names'
import type { ClientInfo } from '../../types/ClientInfo'
import type { FileInfo } from '../../types/FileInfo'
interface FileNamePreviewProps {
    fileInfo: FileInfo
    clientInfo: ClientInfo
    index: number
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

    return createFileNamePreviews(fileInfo, clientInfo, index)
}

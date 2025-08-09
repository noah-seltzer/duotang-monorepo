import type { ClientInfo } from '../ClientInput/ClientInput'
import type { FileInfo } from './FileRow'
import { createFileNamePreviews } from '../../util/file-names'
interface FileNamePreviewProps {
    fileInfo: FileInfo
    clientInfo: ClientInfo
    index: number
}

export function FileNamePreview({
    fileInfo,
    clientInfo,
    index
}: FileNamePreviewProps) {
    if (!fileInfo.file) return 'None'

    return createFileNamePreviews(fileInfo, clientInfo, index)
}

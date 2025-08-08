import type { FC } from 'react'
import type { ClientInfo } from '../ClientInput/ClientInput'
import type { FileInfo } from './FileRow'
import { createFileNamePreviews } from '../../util/file-names'
interface FileNamePreviewProps {
    fileInfo: FileInfo
    clientInfo: ClientInfo
    index: number
}

const getFileExtension = (file: File) => file.name.split('.').pop()

export const FileNamePreview: FC<FileNamePreviewProps> = ({
    fileInfo,
    clientInfo,
    index
}) => {
    if (!fileInfo.file) return 'None'

    return createFileNamePreviews(fileInfo, clientInfo, index)
}

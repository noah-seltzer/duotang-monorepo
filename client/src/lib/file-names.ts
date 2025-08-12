import type { ClientInfo } from '../types/ClientInfo'
import type { FileInfo } from '../types/FileInfo'
const getFileExtensionFromName = (fileName: string) => fileName.split('.').pop()

const subIndexes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

export const createFileNamePreviews = (
    fileInfo: FileInfo,
    clientInfo: ClientInfo,
    index: number
): string[] => {
    const { fileIds = [], maradFileIds = [], docType } = fileInfo
    if (fileIds.length === 0) return ['None']
    
    const clientFullName = `${clientInfo.firstName || 'FirstName'}_${
        clientInfo.lastName || 'LastName'
    }`

    const hasMultipleFiles = fileIds.length > 1 || maradFileIds.length > 1

    const createFileName = (fileName: string, subIndex: number, maradString?: string) => {
        const ext = getFileExtensionFromName(fileName)
        const subIndexChar = hasMultipleFiles ? subIndexes[subIndex] : ''
        return `${index}${subIndexChar}_${docType.slug}_${maradString || ''}${clientFullName}.${ext}`
    }

    const fileNames = fileIds.map((file, i) => createFileName(file.name, i))

    if (maradFileIds.length > 0) {
        const maradFiles = maradFileIds.map((file, i) => createFileName(file.name, i, '_Marad_Confirmation_'))
        fileNames.push(...maradFiles)
    }

    return fileNames
}

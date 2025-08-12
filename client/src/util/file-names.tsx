import type { DocumentType } from '../data/document-list'
import type { ClientInfo } from '../types/ClientInfo'
const getFileExtension = (file: File) => file.name.split('.').pop()
const subIndexes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']



export const createFileNamePreviews = (
    fileList: FileList,
    docType: DocumentType,
    clientInfo: ClientInfo,
    index: number,
    maradFile?: File,
): string[] => {
    const fileArray = Array.from(fileList)

    const name = `${clientInfo.firstName || 'FirstName'}_${
        clientInfo.lastName || 'LastName'
    }`
    const hasMultipleFiles = fileArray.length > 1 || maradFile?.length || 0 > 0

    const fileNames = fileArray.map((file, i) => {
        const ext = getFileExtension(file)
        const subIndexChar = hasMultipleFiles ? subIndexes[i] : ''
        const newFilename = `${index}${subIndexChar}_${docType.slug}_${name}.${ext}`
        return newFilename
    })

    if (maradFile) {
        const ext = getFileExtension(maradFile)
        const newFilename = `${index}${subIndexes[fileNames.length]}_${
            docType.slug
        }_Marad Confirmation_${name}.${ext}`
        fileNames.push(newFilename)
    }

    return fileNames
}

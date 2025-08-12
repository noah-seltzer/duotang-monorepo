import type { ClientInfo } from "../types/ClientInfo";
import type { FileInfo } from "../types/FileInfo";
const getFileExtension = (file: File) => file.name.split('.').pop()

export const createFileNamePreviews = (
    fileInfo: FileInfo,
    clientInfo: ClientInfo,
    index: number
) => {
    const { docType, maradFile } = fileInfo
    const { file } = fileInfo

    if (!file) return

    const fileArray = Array.from(file)

    const name = `${clientInfo.firstName || 'FirstName'}_${
        clientInfo.lastName || 'LastName'
    }`
    const subIndexes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    const hasMultipleFiles = fileArray.length > 1 || maradFile?.length || 0 > 0

    const fileNames = fileArray.map((file, i) => {
        const ext = getFileExtension(file)
        const subIndexChar = hasMultipleFiles ? subIndexes[i] : ''
        const newFilename = `${index}${subIndexChar}_${docType.slug}_${name}.${ext}`
        return <p key={index}>{newFilename}</p>
    })

    if (maradFile && maradFile.length > 0) {
        const file = maradFile[0]
        const ext = getFileExtension(file)
        const newFilename = `${index}${subIndexes[fileNames.length]}_${
            docType.slug
        }_Marad Confirmation_${name}.${ext}`
        fileNames.push(<p key={file.name}>{newFilename}</p>)
    }

    return fileNames
}
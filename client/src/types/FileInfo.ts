import type { DocumentType } from '../data/document-list'

export interface FileInfo {
    id: number
    docType: DocumentType
    file: FileList | null
    fileIds: string[]
    maradFileIds: string[]
    maradFile: FileList | null
}

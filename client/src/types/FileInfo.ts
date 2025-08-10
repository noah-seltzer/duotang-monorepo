import type { DocumentType } from "../data/document-list"

export interface FileInfo {
    id: number
    docType: DocumentType
    file: FileList | null
    maradFile: FileList | null
}
import type { DocumentType } from '../data/document-list'
import type { FileCacheData } from './FileCacheData'

export interface FileInfo {
    id: number
    docType: DocumentType
    file: FileList | null
    fileIds: FileCacheData[]
    maradFileIds: FileCacheData[]
    maradFile: FileList | null
}

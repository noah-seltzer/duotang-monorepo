import { type FC } from 'react'
import { TableData, TableRow } from '../Table/TableStyles'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileInput } from '../Input/FileInput'
import { FileNamePreview } from './FileNamePreview'
import type { ClientInfo } from '../ClientInput/ClientInput'
import { FilePreview } from './FilePreview'

export interface FileInfo {
    id: number
    docType: string
    file: FileList | null
    maradFile: FileList | null
}

export interface FileRowProps {
    row: FileInfo
    clientInfo: ClientInfo
    onRowChange: (updatedRow: FileInfo) => void
    index: number
}

export const FileRow: FC<FileRowProps> = ({
    row,
    onRowChange,
    clientInfo,
    index
}) => {
    const hasFile = row.docType && row.file
    const statusClassName = hasFile ? 'status-complete' : 'status-incomplete'

    const documentInfo = DOCUMENT_TYPES.find(
        (type) => type.name === row.docType
    )

    const files = Array.from(row.file || [])
    if (row.maradFile) files.push(row.maradFile[0])

    return (
        <TableRow>
            {/* Status */}
            <TableData className={hasFile ? 'text-green-500' : 'text-red-500'}>
                {statusClassName}
            </TableData>
            {/* Document Type */}
            <TableData>
                <select
                    value={row.docType}
                    onChange={(e) =>
                        onRowChange({ ...row, docType: e.target.value })
                    }
                >
                    <option value=''>-- Select a document --</option>
                    {DOCUMENT_TYPES.map((type) => (
                        <option key={type.slug} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </TableData>
            {/* Assigned File */}
            <TableData>
                {documentInfo ? (
                    <>
                        <FileInput
                            onChange={(files) =>
                                onRowChange({ ...row, file: files })
                            }
                        />
                        {documentInfo.marad ? (
                            <FileInput
                                title='Add Marad File'
                                onChange={(files) =>
                                    onRowChange({ ...row, maradFile: files })
                                }
                            />
                        ) : (
                            ''
                        )}
                    </>
                ) : (
                    ''
                )}
            </TableData>
            {/* Filename Preview */}
            <TableData>
                <FileNamePreview
                    index={index}
                    fileInfo={row}
                    clientInfo={clientInfo}
                />
            </TableData>
            {/* File Preview */}
            <TableData><FilePreview files={files} /></TableData>
            {/* <TableData>{JSON.stringify(documentInfo)}</TableData> */}
        </TableRow>
    )
}

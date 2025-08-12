import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileInput } from '../Input/FileInput'
import { FileNamePreview } from './FileNamePreview'
import { FilePreviews } from './FilePreview'
import type { ClientInfo } from '../../types/ClientInfo'
import type { FileInfo } from '../../types/FileInfo'

export interface FileRowProps {
    row: FileInfo
    clientInfo: ClientInfo
    onRowChange: (updatedRow: FileInfo) => void
    index: number
}

export function FileRow({ row, onRowChange, clientInfo, index }: FileRowProps) {
    const statusClassName = row.file ? 'status-complete' : 'status-incomplete'

    const files = Array.from(row.file || [])
    if (row.maradFile) files.push(row.maradFile[0])

    return (
        <TableRow>
            {/* Status */}
            <TableCell className={row.file ? 'text-green-500' : 'text-red-500'}>
                {statusClassName}
            </TableCell>
            {/* Document Type */}
            <TableCell>
                <select value={row.docType.slug}>
                    <option value=''>-- Select a document --</option>
                    {DOCUMENT_TYPES.map((type) => (
                        <option
                            onSelect={() =>
                                onRowChange({ ...row, docType: type })
                            }
                            key={type.slug}
                            value={type.slug}
                        >
                            {type.name}
                        </option>
                    ))}
                </select>
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <>
                    <FileInput
                        onChange={(files) =>
                            onRowChange({ ...row, file: files })
                        }
                    />
                    {row.docType.marad ? (
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
            </TableCell>
            {/* Filename Preview */}
            <TableCell>
                <FileNamePreview
                    index={index}
                    fileInfo={row}
                    clientInfo={clientInfo}
                />
            </TableCell>
            {/* File Preview */}
            <TableCell>
                <FilePreviews files={files} />
            </TableCell>
        </TableRow>
    )
}

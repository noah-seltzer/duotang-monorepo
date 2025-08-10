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
    selectedOption: string
}

export function FileRow({
    row,
    onRowChange,
    clientInfo,
    index,
    selectedOption
}: FileRowProps) {
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
            <TableCell className={hasFile ? 'text-green-500' : 'text-red-500'}>
                {statusClassName}
            </TableCell>
            {/* Document Type */}
            <TableCell>
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
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                {documentInfo && selectedOption === 'local' ? (
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
                {documentInfo && selectedOption === 'onedrive' ? (
                    <>
                        <button className='btn btn primary' />
                    </>
                ) : (
                    ''
                )}
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

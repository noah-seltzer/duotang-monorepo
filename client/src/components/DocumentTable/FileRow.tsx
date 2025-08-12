import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileInput } from '../Input/FileInput'
import { FileNamePreview } from './FileNamePreview'
import { FilePreviews } from './FilePreview'
import type { ClientInfo } from '../../types/ClientInfo'
import type { FileInfo } from '../../types/FileInfo'
import { Selector } from './Selector'
import { classNames } from '../../util/tw'

export interface FileRowProps {
    row: FileInfo
    clientInfo: ClientInfo
    onRowChange: (updatedRow: FileInfo) => void
    index: number
}

export function FileRow({ row, onRowChange, clientInfo, index }: FileRowProps) {
    const files = Array.from(row.file || [])
    if (row.maradFile) files.push(row.maradFile[0])

    const options = DOCUMENT_TYPES.map((type) => {
        return { label: type.name, value: type, slug: type.slug }
    })

    return (
        <TableRow>
            {/* Status */}
            <TableCell className={row.file ? 'text-green-500' : 'text-red-500'}>
                <span className={classNames('flex w-3 h-3 me-3 rounded-full', row.file ? 'bg-green-500' : 'bg-red-500')}>

                {/* {statusClassName} */}
                </span>
            </TableCell>
            {/* Document Type */}
            <TableCell>
                <Selector options={options} selectedOption={row.docType.name} onChange={(value) => onRowChange({ ...row, docType: value })} />
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <div className='flex gap-2'>
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
                </div>
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

import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileInput } from '../Input/FileInput'
import { FileNamePreview } from './FileNamePreview'
import { FilePreviews } from './FilePreview'
import type { FileInfo } from '../../types/FileInfo'
import { classNames } from '../../lib/tw'
import { Checkmark } from '../Icon/Checkmark'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectFileRows, updateFileRow } from '../../store/fileListSlice'
import { selectClientInfo } from '../../store/clientInfoSlice'
import { FileTypeSelector } from './FileTypeSelector'
import { getDocumentRowType } from '../../lib/files'

export interface FileRowProps {
    row: FileInfo
    index: number
}

export function FileRow({ row, index }: FileRowProps) {
    const clientInfo = useAppSelector(selectClientInfo)
    const rows = useAppSelector(selectFileRows)
    const dispatch = useAppDispatch()

    const isComplete =
        row.fileIds?.length > 0 &&
        (row.docType.marad ? row.maradFileIds?.length > 0 : true)

    const usedSlugs = rows.map((row) => row.docType.slug)
    const unusedFileTypes = DOCUMENT_TYPES.filter(
        (type) => !usedSlugs.includes(type.slug)
    )

    const options = unusedFileTypes.map((docType) => ({
        value: docType.slug,
        label: docType.label
    }))

    const currentOption = { value: row.docType.slug, label: row.docType.label }

    return (
        <TableRow>
            {/* Status */}
            <TableCell className='p-6 space-y-0'>
                <span
                    className={classNames(
                        'flex w-10 h-6 rounded-full',
                        isComplete ? 'bg-green-500' : 'bg-red-500'
                    )}
                ></span>
            </TableCell>
            {/* Document Type */}
            <TableCell>
                <FileTypeSelector
                    options={options}
                    currentOption={currentOption}
                    onChange={(value) => {
                        const newDocType = getDocumentRowType(value.value)
                        dispatch(updateFileRow({ ...row, docType: newDocType }))
                    }}
                />
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <div className='flex flex-row items-center gap-2'>
                    <FileInput
                        onSaved={(files) =>
                            dispatch(updateFileRow({ ...row, fileIds: files }))
                        }
                    />
                    <Checkmark
                        checked={!!row.fileIds && row.fileIds.length > 0}
                    />
                </div>
            </TableCell>
            <TableCell>
                {row.docType.marad ? (
                    <div className='flex flex-row items-center gap-2'>
                        <FileInput
                            title='Add Marad File'
                            onSaved={(files) =>
                                dispatch(
                                    updateFileRow({
                                        ...row,
                                        maradFileIds: files
                                    })
                                )
                            }
                        />
                        <Checkmark
                            checked={
                                !!row.maradFileIds &&
                                row.maradFileIds.length > 0
                            }
                        />
                    </div>
                ) : (
                    'No Marad Required'
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
                <FilePreviews row={row} />
            </TableCell>
        </TableRow>
    )
}

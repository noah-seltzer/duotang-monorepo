import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileInput } from '../Input/FileInput'
import { FileNamePreview } from './FileNamePreview'
import { FilePreviews } from './FilePreview'
import type { FileInfo } from '../../types/FileInfo'
import { classNames } from '../../util/tw'
import Select from 'react-select'
import { Checkmark } from '../icon/Checkmark'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { updateFileRow } from '../../store/fileListSlice'

export interface FileRowProps {
    row: FileInfo
    index: number
}

export function FileRow({ row, index }: FileRowProps) {
    const clientInfo = useSelector((state: RootState) => state.clientInfo)
    const dispatch = useDispatch()

    const files = Array.from(row.file || [])
    if (row.maradFile) files.push(row.maradFile[0])

    const options = DOCUMENT_TYPES.map((type) => {
        return { label: type.name, value: type, slug: type.slug }
    })

    const isComplete = row.file && (row.docType.marad ? !!row.maradFile : true)

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
                <div className='overflow-visible'>
                    <Select
                        className='basic-single overflow-visible w-76'
                        classNamePrefix='select'
                        isSearchable={true}
                        options={options}
                        placeholder='Select Document Type'
                        onChange={(value) => {
                            if (!value) return
                            dispatch(
                                updateFileRow({ ...row, docType: value.value })
                            )
                        }}
                    />
                </div>
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <div className='flex flex-row items-center gap-2'>
                    <FileInput
                        onChange={(files) =>
                            dispatch(updateFileRow({ ...row, file: files }))
                        }
                    />
                    <Checkmark checked={!!row.file} />
                </div>
            </TableCell>
            <TableCell>
                {row.docType.marad ? (
                    <div className='flex flex-row items-center gap-2'>
                        <FileInput
                            title='Add Marad File'
                            onChange={(files) =>
                                dispatch(
                                    updateFileRow({ ...row, maradFile: files })
                                )
                            }
                        />
                        <Checkmark checked={!!row.maradFile} />
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
                <FilePreviews files={files} />
            </TableCell>
        </TableRow>
    )
}

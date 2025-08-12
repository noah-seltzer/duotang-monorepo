import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES, getDocumentType } from '../../data/document-list'
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
    
    const fileIds = [...row.fileIds || [], ...(row.maradFileIds || [])]

    const isComplete = row.file && (row.docType.marad ? !!row.maradFile : true)

    const options = DOCUMENT_TYPES.map((docType) => ({
        value: docType.slug,
        label: docType.label,
    }))

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
                        isMulti={false}
                        className='basic-single overflow-visible w-76'
                        options={options}
                        value={{value: row.docType.slug, label: row.docType.label}}
                        placeholder='Select Document Type'
                        onChange={(value) => {
                            if (!value) return
                            const newDocType = getDocumentType(value.value)
                            dispatch(updateFileRow({ ...row, docType: newDocType }))
                        }}
                    />
                </div>
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <div className='flex flex-row items-center gap-2'>
                    <FileInput
                        onSaved={(files) =>
                            dispatch(updateFileRow({ ...row, fileIds: files }))
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
                            onSaved={(files) =>
                                dispatch(
                                    updateFileRow({ ...row, maradFileIds: files })
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
                {/* <FileNamePreview
                    index={index}
                    fileInfo={row}
                    clientInfo={clientInfo}
                /> */}
            </TableCell>
            {/* File Preview */}
            <TableCell>
                {/* <FilePreviews files={fileIds} /> */}
            </TableCell>
        </TableRow>
    )
}

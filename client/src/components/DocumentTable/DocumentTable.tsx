import { ClientInput } from '../ClientInput/ClientInput'
import { FileRow } from './FileRow'
import { Table } from '../Table/Table'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { LoginOutButtons } from '../Auth/LoginOutButtons'
import { useAppDispatch, useAppSelector } from '../../store'
import { addFileRow, selectFileRows } from '../../store/fileListSlice'

export const createBlankRow = (index: number = 0) => {
    return {
        id: index + 1,
        docType: DOCUMENT_TYPES[0],
        file: null,
        maradFile: null
    }
}

const rowNames = [
    'Status',
    'Document',
    'File',
    'Marad File',
    'Filename',
    'File'
]

/**
 * Outermost parent for the spreadsheet-like document table
 */
export function DocumentTable(): React.JSX.Element {
    const rows = useAppSelector(selectFileRows)
    const dispatch = useAppDispatch()

    const addRow = () => {
        dispatch(addFileRow())
    }

    const rowElements = rows.map((r, i) => (
        <FileRow index={i + 1} key={r.id} row={r} />
    ))

    return (
        <div>
            <div className='flex justify-left'>
                <LoginOutButtons />
            </div>
            <ClientInput />
            <div className='relative'>
                <Table rowNames={rowNames} rows={rowElements} />
            </div>
            <div className='flex justify-left mt-2'>
                <button className='btn btn-secondary' onClick={addRow}>
                    Add Row
                </button>
            </div>
        </div>
    )
}

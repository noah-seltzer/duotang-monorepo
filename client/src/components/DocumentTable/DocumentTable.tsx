import { useState } from 'react'
import { ClientInput } from '../ClientInput/ClientInput'
import { Header, HeaderCell } from '../Table/TableComponents'
import { type FileInfo, FileRow } from './FileRow'
import { FileSourceSelector } from '../ClientInput/FileSourceSelector'
import { Table } from '../Table/Table'

export const createBlankRow = (index: number = 0) => {
    return { id: index + 1, docType: '', file: null, maradFile: null }
}

export const STARTING_CLIENT_INFO = {
    firstName: 'Noah',
    lastName: 'Seltzer',
    jobTitle: 'Second Engineer'
}

const rowNames = ['Status', 'Document', 'Assigned', 'Filename', 'File']

/**
 * Outermost parent for the spreadsheet-like document table
 */
export function DocumentTable(): React.JSX.Element {
    const [clientInfo, setClientInfo] = useState(STARTING_CLIENT_INFO)

    const [fileSource, setFileSource] = useState<string>('local')

    const [rows, setRows] = useState<FileInfo[]>([createBlankRow()])

    const addRow = () => {
        setRows([...rows, createBlankRow(rows.length + 1)])
    }

    const onRowChange = (row: FileInfo) => {
        const newRows = rows.map((r) => (r.id === row.id ? row : r))
        setRows(newRows)
    }

    const rowElements = rows.map((r, i) => (
        <FileRow
            index={i + 1}
            onRowChange={(row: FileInfo) => onRowChange(row)}
            clientInfo={clientInfo}
            key={r.id}
            row={r}
            selectedOption={fileSource}
        />
    ))

    return (
        <div>
            <FileSourceSelector
                onRadioButtonClicked={setFileSource}
                selectedOption={fileSource}
            />
            <ClientInput
                clientInfo={clientInfo}
                handleClientInfoChange={setClientInfo}
            />
            <div className='relative overflow-x-auto'>
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

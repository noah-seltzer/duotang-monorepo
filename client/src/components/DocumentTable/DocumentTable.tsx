import { useState } from 'react'
import { ClientInput } from '../ClientInput/ClientInput'
import { Header, HeaderCell } from '../Table/TableComponents'
import { type FileInfo, FileRow } from './FileRow'
import { FileSourceSelector } from '../ClientInput/FileSourceSelector'

export const createBlankRow = (index: number = 0) => {
    return { id: index + 1, docType: '', file: null, maradFile: null }
}

export function DocumentTable(): React.JSX.Element {
    const [clientInfo, setClientInfo] = useState({
        firstName: 'Noah',
        lastName: 'Seltzer',
        jobTitle: 'Second Engineer'
    })

    const [fileSource, setFileSource] = useState<string>('local')

    const [rows, setRows] = useState<FileInfo[]>([createBlankRow()])

    const addRow = () => {
        setRows([...rows, createBlankRow(rows.length + 1)])
    }

    const onRowChange = (row: FileInfo) => {
        const newRows = rows.map((r) => (r.id === row.id ? row : r))
        setRows(newRows)
    }

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
                <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <Header>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Document Type</HeaderCell>
                        <HeaderCell>Assigned File</HeaderCell>
                        <HeaderCell>Filename Preview</HeaderCell>
                        <HeaderCell>File Preview</HeaderCell>
                    </Header>
                    <tbody>
                        {rows.map((r, i) => (
                            <FileRow
                                index={i + 1}
                                onRowChange={(row: FileInfo) =>
                                    onRowChange(row)
                                }
                                clientInfo={clientInfo}
                                key={r.id}
                                row={r}
                                selectedOption={fileSource}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-left mt-2'>
                <button className='btn btn-secondary' onClick={addRow}>
                    Add Row
                </button>
            </div>
        </div>
    )
}

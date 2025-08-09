import { useState, type FC } from 'react'
import { ClientInput } from '../ClientInput/ClientInput'
import { Header, HeaderRow } from '../Table/TableStyles'
import { type FileInfo, FileRow } from './FileRow'
import type { DocumentRowState } from './DocumentRow.interface'
import { FileSourceSelector } from '../ClientInput/FileSourceSelector'
// test
export interface DocumentTableProps {
    rows: DocumentRowState[]
    onRowChange: (
        id: number,
        field: 'docType' | 'file',
        value: string | File
    ) => void
}

export const DocumentTable: FC<DocumentTableProps> = () => {
    const [clientInfo, setClientInfo] = useState({
        firstName: 'Noah',
        lastName: 'Seltzer',
        jobTitle: 'Second Engineer'
    })

    const [fileSource, setFileSource] = useState<string>('local')

    const [rows, setRows] = useState<FileInfo[]>([
        { id: 1, docType: '', file: null, maradFile: null }
    ])

    const addRow = () => {
        setRows([
            ...rows,
            { id: rows.length + 1, docType: '', file: null, maradFile: null }
        ])
    }

    const onRowChange = (row: FileInfo) => {
        const idx = rows.findIndex((r) => r.id === row.id)
        const newRows = [...rows]
        newRows[idx] = row
        setRows(newRows)
    }

    return (
        <div>
            <FileSourceSelector onRadioButtonClicked={setFileSource} selectedOption={fileSource} />
            <ClientInput
                clientInfo={clientInfo}
                handleClientInfoChange={setClientInfo}
            />
            <div className='relative overflow-x-auto'>
                <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <Header>
                        <HeaderRow>Status</HeaderRow>
                        <HeaderRow>Document Type</HeaderRow>
                        <HeaderRow>Assigned File</HeaderRow>
                        <HeaderRow>Filename Preview</HeaderRow>
                        <HeaderRow>File Preview</HeaderRow>
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

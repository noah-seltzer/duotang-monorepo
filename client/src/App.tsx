import { useState } from 'react'
import './App.css'
import { DocumentTable } from './components/DocumentTable/DocumentTable'
import type { DocumentRowState } from './components/DocumentTable/DocumentRow.interface'

const createNewRow = (): DocumentRowState => ({
    id: Date.now(),
    docType: '',
    file: null
})

function App() {
    const [rows, setRows] = useState<DocumentRowState[]>([createNewRow()])

    const handleRowChange = (
        id: number,
        field: 'docType' | 'file',
        value: string | File
    ) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        )
    }
    return (
        <>
            <DocumentTable rows={rows} onRowChange={handleRowChange} />
        </>
    )
}

export default App

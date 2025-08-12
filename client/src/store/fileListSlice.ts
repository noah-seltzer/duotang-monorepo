import { createSlice } from '@reduxjs/toolkit'
import type { FileInfo } from '../types/FileInfo'
import { DOCUMENT_TYPES } from '../data/document-list'

export interface FileListState {
    fileRows: FileInfo[]
}

const initialState: FileListState = {
    fileRows: [
        {
            id: 0,
            docType: DOCUMENT_TYPES[0],
            file: null,
            maradFile: null
        }
    ]
}

export const createBlankRow = (index: number = 0) => {
    return {
        id: index + 1,
        docType: DOCUMENT_TYPES[0],
        file: null,
        maradFile: null
    }
}

export const fileListSlice = createSlice({
    name: 'fileRow',
    initialState,
    reducers: {
        addFileRow: (state) => {
            state.fileRows = [
                ...state.fileRows,
                createBlankRow(state.fileRows.length + 1)
            ]
        },
        updateFileRow: (state, action) => {
            const updatedRow = action.payload
            state.fileRows = state.fileRows.map((row) =>
                row.id === updatedRow.id ? updatedRow : row
            )
        },
    }
})


export const { addFileRow, updateFileRow } = fileListSlice.actions

export default fileListSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { FileInfo } from '../types/FileInfo'
import { DOCUMENT_TYPES } from '../data/document-list'
import type { RootState } from '.'

export interface FileListState {
    fileRows: FileInfo[]
}

export const createBlankRow = (index: number = 0) => {
    return {
        id: index + 1,
        docType: DOCUMENT_TYPES[0],
        file: null,
        maradFile: null,
        fileIds: [],
        maradFileIds: []
    }
}

const initialState: FileListState = {
    fileRows: [createBlankRow(0)]
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
        }
    }
})

export const selectFileRows = (state: RootState) => state.fileList.fileRows
export const selectUnusedFileTypes = (state: RootState) => {
    const usedFileTypes = state.fileList.fileRows.map((row) => row.docType.slug)
    return DOCUMENT_TYPES.filter((type) => !usedFileTypes.includes(type.slug))
}

export const { addFileRow, updateFileRow } = fileListSlice.actions

export default fileListSlice.reducer

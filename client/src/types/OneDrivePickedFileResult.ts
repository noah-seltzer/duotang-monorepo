interface OneDrivePickedFile {
    webDavUrl: string
    id: string
}

export interface OneDrivePickedFileResult {
    command: string
    items: OneDrivePickedFile[]
}
export interface DocumentType {
    name: string
    slug: string
    marad: boolean
    add_year?: boolean
    file_name_spec?: string
}

export const DEFAULT_DOCUMENT_TYPE: DocumentType = {
    name: 'Confirmation of Competency',
    slug: 'CoC',
    marad: true,
    file_name_spec: ''
}

export const DOCUMENT_TYPES: DocumentType[] = [
    {
        name: 'Confirmation of Competency',
        slug: 'CoC',
        marad: true,
        file_name_spec: ''
    },
    {
        name: 'Endorsement',
        slug: 'Endorsement',
        marad: true
    },
    {
        name: 'Basic Safety',
        slug: 'Basic Safety',
        marad: false
    },
    {
        name: 'AFF',
        slug: 'AFF',
        marad: true
    },
    {
        name: 'Survival Craft',
        slug: 'Survival Craft',
        marad: true
    },
    {
        name: 'Marine Medical Certificate',
        slug: 'Marine Medical Certificate',
        marad: false
    },
    {
        name: 'Seafarer Application',
        slug: 'E_Seafarer Application',
        marad: false
    },
    {
        name: 'AR Application',
        slug: 'Seafarer Application',
        marad: false
    },
    {
        name: 'Familiarization',
        slug: 'Familiarization',
        marad: false
    },
    {
        name: 'Photo Front',
        slug: 'Photo Front',
        marad: false
    },
    {
        name: 'Photo Back',
        slug: 'Photo Back',
        marad: false
    },
    {
        name: 'Work Permit',
        slug: 'Work Permit',
        marad: false,
        add_year: true
    }
]

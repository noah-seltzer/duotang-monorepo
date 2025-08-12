import Select from 'react-select'

export interface SelectOption {
    value: string
    label: string
}

interface FileTypeSelectorProps {
    options: SelectOption[]
    currentOption: SelectOption
    onChange: (value: SelectOption) => void
}

export function FileTypeSelector({
    options,
    currentOption,
    onChange
}: FileTypeSelectorProps) {
    return (
        <div className='overflow-visible'>
            <Select
                isMulti={false}
                className='basic-single overflow-visible w-76'
                options={options}
                value={currentOption}
                placeholder='Select Document Type'
                onChange={(value) => {
                    if (!value) return
                    onChange(value)
                }}
            />
        </div>
    )
}

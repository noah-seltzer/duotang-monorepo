

interface SelectorProps<T> {
    options: { label: string; value: T, slug: string }[]
    onChange: (value: T) => void
    placeholder?: string
    selectedOption: string
}

export function Selector<T>({
    options,
    onChange,
    placeholder,
    selectedOption
}: SelectorProps<T>) {
    return (
        <select
            key={selectedOption}
            value={selectedOption}
            onChange={(e) => onChange(options[Number(e.target.value)].value)}
        >
            <option value=''>{placeholder ?? '-- Select a document --'}</option>
            {options.map((option) => (
                <option key={option.slug} value={option.label}>{option.label}</option>
            ))}
        </select>
    )
}

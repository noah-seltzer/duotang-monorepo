import type { ChangeEvent } from "react";

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
    const onRowChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(options.find(option => option.slug === e.target.value)?.value as T);
    }

    return (

        <select
            key={selectedOption}
            value={selectedOption}
            onChange={onRowChanged}
        >
            <option value=''>{placeholder ?? '-- Select a document --'}</option>
            {options.map((option) => (
                <option key={option.slug} value={option.slug}>{option.label}</option>
            ))}
        </select>
    )
}

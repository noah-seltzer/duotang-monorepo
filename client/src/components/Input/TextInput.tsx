export interface TextInputProps {
    placeholder?: string
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
}

export function TextInput({
    placeholder,
    value,
    onChange,
    name
}: TextInputProps) {
    return (
        <>
            <input
                type='text'
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

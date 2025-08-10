import type { ClientInfo } from "../../types/ClientInfo"
import { TextInput } from "../Input/TextInput"

export interface ClientInputProps {
    clientInfo: ClientInfo
    handleClientInfoChange: (info: ClientInfo) => void
}

export function ClientInput({
    clientInfo: { firstName, lastName, jobTitle },
    handleClientInfoChange
}: ClientInputProps) {
    return (
        <div className='client-info'>
            <TextInput
                name='firstName'
                placeholder='Client First Name'
                value={firstName}
                onChange={(event) => {
                    handleClientInfoChange({
                        firstName: event.target.value,
                        lastName,
                        jobTitle
                    })
                }}
            />
            <TextInput
                name='lastName'
                placeholder='Client Last Name'
                value={lastName}
                onChange={(event) => {
                    handleClientInfoChange({
                        firstName,
                        lastName: event.target.value,
                        jobTitle
                    })
                }}
            />
            <TextInput
                name='Client Job Title'
                placeholder='Client Job Title'
                value={jobTitle}
                onChange={(event) => {
                    handleClientInfoChange({
                        firstName,
                        lastName,
                        jobTitle: event.target.value
                    })
                }}
            />
        </div>
    )
}

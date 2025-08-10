import type { ClientInfo } from "../../types/ClientInfo"
import { TextInput } from "../Input/TextInput"

export interface ClientInputProps {
    clientInfo: ClientInfo
    handleClientInfoChange: (info: ClientInfo) => void
}

/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info 
 */
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

import type { FC } from 'react'

export interface ClientInfo {
    firstName: string
    lastName: string
    jobTitle: string
}
export interface ClientInputProps {
    clientInfo: ClientInfo
    handleClientInfoChange: (info: ClientInfo) => void
}

export const ClientInput: FC<ClientInputProps> = ({
    clientInfo: { firstName, lastName, jobTitle },
    handleClientInfoChange
}) => {
    return (
        <div className='client-info'>
            <input
                type='text'
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
            <input
                type='text'
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
            <input
                type='text'
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

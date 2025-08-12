import { useDispatch, useSelector } from 'react-redux'
import { TextInput } from '../Input/TextInput'
import { updateFirstName, updateJobTitle, updateLastName } from '../../store/clientInfoSlice'
import type { RootState } from '../../store'

/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info
 */
export function ClientInput() {
    const {firstName, lastName, jobTitle} = useSelector((state: RootState) => state.clientInfo)

    const dispatch = useDispatch()
    return (
        <div className='client-info'>
            <TextInput
                name='firstName'
                placeholder='Client First Name'
                value={firstName}
                onChange={(event) => {
                    dispatch(updateFirstName(event.target.value))
                }}
            />
            <TextInput
                name='lastName'
                placeholder='Client Last Name'
                value={lastName}
                onChange={(event) => {
                    dispatch(updateLastName(event.target.value))
                    
                }}
            />
            <TextInput
                name='Client Job Title'
                placeholder='Client Job Title'
                value={jobTitle}
                onChange={(event) => {
                    dispatch(updateJobTitle(event.target.value))
                }}
            />
        </div>
    )
}

import { useMsal } from '@azure/msal-react';
import { Login } from './login'
import { Logout } from './logout'

export function LoginOutButtons(): React.JSX.Element {
    const { instance } = useMsal()
    
    let isLoggedIn = instance.getAllAccounts().length > 0;
    return (
        <div className='p-2'>
            {isLoggedIn ? <Logout /> : <Login />}
        </div>
    )
}
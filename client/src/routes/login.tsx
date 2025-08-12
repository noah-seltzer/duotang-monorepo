import { createFileRoute } from '@tanstack/react-router'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../data/auth-config.ts';

export const Route = createFileRoute('/login')({
    component: About
})

function About() {
    const { instance } = useMsal()
    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.log(e)
        })
    }
    const isLoggedIn = instance.getAllAccounts().length > 0;
    return <div className='p-2'>
        {isLoggedIn ? <p>You are logged in</p> : <p>You are not logged in</p>}
        <button onClick={handleLogin}>Login</button>
    </div>
}

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

    return <div className='p-2'>Login Page</div>
}

import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../data/auth-config.ts'

export function Login(): React.JSX.Element {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.log(e)
        })
    }

    return <button onClick={handleLogin}>Login</button>
}

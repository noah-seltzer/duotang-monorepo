import { useMsal } from '@azure/msal-react'

export function Logout(): React.JSX.Element {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.logout()
    }

    return <button onClick={handleLogin}>Logout</button>
}

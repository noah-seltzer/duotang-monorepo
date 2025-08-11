import { useMsal } from "@azure/msal-react"

export function Logout(): React.JSX.Element {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.logout()
    }

    return (
        <div className='p-2'>
            <button onClick={handleLogin}>Logout</button>
        </div>
    )
}
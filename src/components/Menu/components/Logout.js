import { signOut } from "next-auth/react"

export default function Logout() {

    async function handleGoogleLogout(){
        signOut('google', {callbackUrl: "http://localhost:3000/login"})
    }

    return (
        <button onClick={handleGoogleLogout}>Logout</button> 
    )
}
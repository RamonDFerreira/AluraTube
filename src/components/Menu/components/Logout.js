import { signOut } from "next-auth/react"
import { IoLogOutOutline } from "react-icons/io5"

export default function Logout() {

    async function handleGoogleLogout(){
        signOut('google', {callbackUrl: "http://localhost:3000/login"})
    }

    return (
        
        <IoLogOutOutline onClick={handleGoogleLogout}>Logout</IoLogOutOutline> 
    )
}
import React from 'react'
import {useSession, signIn, signOut, getSession} from 'next-auth/react'

const login = () => {
    const {data: session} = useSession()

    async function handleGoogleSignIn(){
        signIn('google', {callbackUrl: "http://localhost:3000"})       
    }

    if(session) {
        return(
            <div>
                <p>Welcome, {session.user?.email}</p>
                <img src={session.user?.image} style={{borderRadius: '50px'}} />
                <button onClick={() => signOut()}>SignOut</button>
            </div>
        )
    } else {
        return(
            <div>
                <p>You are not signed in</p>
                <button onClick={handleGoogleSignIn}>SignIn</button>
            </div>
        ) 
    }
}

export default login


export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    
    if(session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: {session},
    }
}
import React from 'react'
import {useSession, signIn, signOut, getSession} from 'next-auth/react'
import FormLogin from '../src/components/Login/FormLogin'
import BackgroundLogin from '../src/components/Login/BackgroundLogin'

const login = () => {
    const {data: session} = useSession()

    async function handleGoogleSignIn(){
        signIn('google', {callbackUrl: process.env.NEXTAUTH_URL})       
    }

    if(!session) {
        return(
            <>
                <BackgroundLogin />
                <FormLogin handleGoogleSignIn={handleGoogleSignIn}/>
            </>
            
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
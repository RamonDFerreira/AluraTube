import { useState, useEffect } from "react";
import { videoService } from "../src/services/videoService";
import { getSession, useSession } from 'next-auth/react'
import Menu from "../src/components/Menu";
import IndexPage from "../src/components/Head";
import Timeline from "../src/components/Timeline";
import { Header } from "../src/components/Header";
import RegisterVideo from "../src/components/RegisterVideo";




export default function HomePage() {

    const { data: session } = useSession()
    const [valorDoFiltro, setValorDoFiltro] = useState('');
    const [playlists, setPlaylists] = useState({})
    
    if (session) {
        
        return (
            <>  
                <IndexPage />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    // backgroundColor: "red",
                }}>
                    <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                    <Header />
                    <Timeline searchValue={valorDoFiltro} playlists={playlists} setPlaylists={setPlaylists} />
                    <RegisterVideo playlists={playlists} setPlaylists={setPlaylists} />
                </div>
            </>
        );
    }
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props: { session },
    }
}
import { useState, useEffect } from "react";
import { videoService } from "../src/services/videoService";
import { getSession, useSession } from 'next-auth/react'
import Menu from "../src/components/Menu";
import IndexPage from "../src/components/Head";
import Timeline from "../src/components/Timeline"; 
import { Header } from "../src/components/Header";

export default function HomePage() {
    const service = videoService()
    const [valorDoFiltro, setValorDoFiltro] = useState('');
    const [playlists, setPlaylists] = useState({}) 

    useEffect(async () => {
        await service.getUserVideos(session.user?.email)
            .then((dados) => {
            const novasPlayslists = { ...playlists }
            dados.data.map((video) => {
              if (!novasPlayslists[video.playlist]) {
                novasPlayslists[video.playlist] = []
              }
              novasPlayslists[video.playlist].push(video)
            })
            setPlaylists(novasPlayslists)
          })
        
    }, [])
    

    const {data: session} = useSession()

    if(session) {
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
                    <Timeline searchValue={valorDoFiltro} playlists={playlists} />
                </div>
            </>
        );
    }     
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    
    if(!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props: {session},
    }
}
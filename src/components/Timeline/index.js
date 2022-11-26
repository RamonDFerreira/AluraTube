import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { StyledTimeline } from "./styles";
import { BsTrash } from "react-icons/bs"
import { videoService } from "../../services/videoService";
import RemoveDialog from "../RemoveDialog";


export default function Timeline({searchValue, playlists, setPlaylists}) {

    const [urlVideoSelecionado, setUrlVideoSelecionado] = useState('');
    const { data: session } = useSession()
    const service = videoService();
    const userEmail = session.user?.email 
    const playlistNames = Object.keys(playlists);
    const [open, setOpen] = useState(false);
    
    const fetchVideos = async () => { 
        console.log(userEmail)
        const userVideos = await service.getUserVideos(userEmail)
        setPlaylists(userVideos)    
    }

    useEffect(() => {
        fetchVideos() 
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <StyledTimeline>
            <RemoveDialog isOpen={open} handleCloseDialog={() => setOpen(false)} url={urlVideoSelecionado} userEmail={userEmail} setPlaylists={setPlaylists}/>              
            {playlistNames.map((playlistName) => {
                const videos = playlists[playlistName];
                return ( 
                    <section key={playlistName}>
                        
                        <h2>{playlistName}</h2>
                        <div className="carrousel">
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <div className="thumbnail">
                                            <img src={video.thumb} />
                                            <BsTrash color="white" size={20} onClick={(e) => {
                                                e.preventDefault()
                                                setUrlVideoSelecionado(video.url)
                                                handleClickOpen()
                                            }}> Remover 
                                            </BsTrash>
                                        </div>
                                        <span>
                                            {video.title}
                                        </span>                                                       
                                    </a>        
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}
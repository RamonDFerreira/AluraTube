import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { videoService } from "../../services/videoService";
import { StyledTimeline } from "./styles";
import { BsTrash } from "react-icons/bs"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

export default function Timeline({searchValue, playlists, setPlaylists}) {

    const service = videoService();
    const { data: session } = useSession()
    const userEmail = session.user?.email 
    const playlistNames = Object.keys(playlists);
    
    const fetchVideos = async () => { 
        console.log(userEmail)
        const userVideos = await service.getUserVideos(userEmail)
        setPlaylists(userVideos)    
    }
    const [urlVideoSelecionado, setUrlVideoSelecionado] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchVideos() 
    }, [])
    
    async function excluirVideo(url, userEmail){
        await service.removeVideo(url, userEmail)
        fetchVideos()
        setOpen(false);
    }

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = playlists[playlistName];
                return ( 
                    <section key={playlistName}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"Excluir"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem certeza que deseja excluir o vídeo?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={() => excluirVideo(urlVideoSelecionado, userEmail)} autoFocus>
                                Excluir
                            </Button>
                            </DialogActions>
                        </Dialog>
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
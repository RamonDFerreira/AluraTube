import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { videoService } from "../../services/videoService";
import { useState } from 'react';

export default function RemoveDialog({isOpen, handleCloseDialog, url, userEmail, setPlaylists}){

    const service = videoService();

    const handleClose = () => {
        handleCloseDialog(false);
    };

    const fetchVideos = async () => { 
        console.log(userEmail)
        const userVideos = await service.getUserVideos(userEmail)
        setPlaylists(userVideos)    
    }
        
    async function excluirVideo(url, userEmail){
        await service.removeVideo(url, userEmail)
        fetchVideos()
        handleClose();
    }

    return(
        <Dialog
            open={isOpen}
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
            <Button onClick={() => excluirVideo(url, userEmail)} autoFocus>
                Excluir
            </Button>
            </DialogActions>
        </Dialog>
    )
}

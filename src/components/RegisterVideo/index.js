import React from "react";
import { videoService } from "../../services/videoService";
import { StyledRegisterVideo } from "./styles";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { useSession } from "next-auth/react";

// Whiteboarding
// Custom Hook

export default function RegisterVideo({playlists, setPlaylists}) {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitSuccessful } 
    } = useForm({
        defaultValues: {
            titulo: "",
            url: "",
            playlist: ""           
        }
    });

    React.useEffect(() => {
        reset({})
    }, [isSubmitSuccessful])
      
    const [formVisivel, setFormVisivel] = React.useState(false);
    const service = videoService();
    const {data: session} = useSession()
    const userEmail = session.user.email
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel && (
                <form onSubmit={handleSubmit((data) => {

                    service.insertVideo(data.titulo, data.url, data.playlist, userEmail)
                        .then(async () => {
                            const userVideos = await service.getUserVideos(userEmail)
                            setPlaylists(userVideos) 
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                    
                    setFormVisivel(false);
                })}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do vídeo"
                            {...register(
                                "titulo",
                                { required: <Alert severity="error">Favor informar o titulo do vídeo.</Alert> }
                            )
                            }
                        />
                        <span>{errors.titulo?.message}</span>
                        <input
                            placeholder="URL"
                            {...register(
                                "url",
                                { required: <Alert severity="error">Favor informar a URL do vídeo.</Alert>}
                            )
                            }
                        />
                        <span>{errors.url?.message}</span>
                        <input
                            placeholder="Playlist do Vídeo"
                            {...register(
                                "playlist",
                                { required: <Alert severity="error">Favor informar a qual playlist deseja adicionar o vídeo.</Alert>}
                            )
                            }
                        />
                        <span>{errors.playlist?.message}</span>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}
        </StyledRegisterVideo>
    )
}

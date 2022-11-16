import React from "react";
import { videoService } from "../../services/videoService";
import { StyledRegisterVideo } from "./styles";
import { useForm } from "react-hook-form";

// Whiteboarding
// Custom Hook

export default function RegisterVideo() {
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

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel && (
                <form onSubmit={handleSubmit((data) => {
   
                    console.log(data)
                    service.insertVideo(data.titulo, data.url, data.playlist)
                        .then((data) => {
                            console.log(data)
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
                                { required: 'Favor informar o título do vídeo.' }
                            )
                            }
                        />
                        <p>{errors.titulo?.message}</p>
                        <input
                            placeholder="URL"
                            {...register(
                                "url",
                                { required: 'Favor informar a URL do vídeo.' }
                            )
                            }
                        />
                        <p>{errors.url?.message}</p>
                        <input
                            placeholder="Playlist do Vídeo"
                            {...register(
                                "playlist",
                                { required: 'Favor informar a qual playlist deseja adicionar o vídeo.' }
                            )
                            }
                        />
                        <p>{errors.playlist?.message}</p>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}
        </StyledRegisterVideo>
    )
}

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { videoService } from "../../services/videoService";
import { StyledTimeline } from "./styles";


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

    useEffect(() => {
        fetchVideos() 
    }, [])
    
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
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
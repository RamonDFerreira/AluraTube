import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://zproctvaumtsxhyxqlrl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwcm9jdHZhdW10c3hoeXhxbHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTU2NzAsImV4cCI6MTk4Mzc5MTY3MH0.uo6gfMSKHB2etlK_SLLTnKhzkQIYT8AeV4x62S4_ZGo'
const supabase = createClient(supabaseUrl, supabaseKey)

//get youtube thumbnail from video url 
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export function videoService() {
  return {
    async getAllVideos() {
      return await supabase.from("video")
        .select("*")       
    },

    async getUserVideos(userEmail) {
      const {data} = await supabase.from("video") 
        .select()
        .eq('userEmail', userEmail)  
      return {data} 
    },

    async insertVideo(url, playlist, userEmail){

      const title = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
        .then(res => res.json())
        .then(data => {return data.title})


      const { video, error } = await supabase.from("video").insert({
        title,
        url,
        thumb: getThumbnail(url),
        playlist: playlist.toUpperCase(),
        userEmail
      })

      if (error) console.log(error)

      return video
    },

    async removeVideo(url, userEmail){
      const { video, error } = await supabase.from("video").delete().match({
        url,
        userEmail
      })

      if (error) console.log(error)
      
      return video
    }
  }
}
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://zproctvaumtsxhyxqlrl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwcm9jdHZhdW10c3hoeXhxbHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTU2NzAsImV4cCI6MTk4Mzc5MTY3MH0.uo6gfMSKHB2etlK_SLLTnKhzkQIYT8AeV4x62S4_ZGo'
const supabase = createClient(supabaseUrl, supabaseKey)

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

    //get youtube thumbnail from video url 
    async getThumbnail(url) {
      return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
    },

    async getTitle(url){
      const title = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
        .then(res => res.json())
        .then(data => {return data.title})
      
      return title
    },

    async insertVideo(url, playlist, userEmail, title, thumb){

      const { video, error } = await supabase.from("video").insert({
        title,
        url,
        thumb,
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
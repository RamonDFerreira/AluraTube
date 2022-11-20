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
    getAllVideos() {
      return supabase.from("video")
        .select("*")       
    },

    getUserVideos(userEmail) {
      return supabase.from("video")
        .select("*")
        .eq('userEmail', userEmail)  
   
    },

    insertVideo(title, url, playlist, userEmail){
      return supabase.from("video").insert({
        title,
        url,
        thumb: getThumbnail(url),
        playlist: playlist.toUpperCase(),
        userEmail
    })
    }
  }
}
import { createContext, useState } from "react";


export const  SongContext = createContext();

export const SongContextProvider = ({children}) => {
  const [song , setSong] = useState({
  
   
       
        "url": "https://ik.imagekit.io/nofimhrkx/cohort-2/moodify/songs/system_se_mouse_pe_click_kariye_raja_ji___सिस्टम_पे_माऊस_से_किलिक_करिये_राजा_जी____shilpiraj_tXOTOVyMui.mp3",
        "posteUrl": null,
        "title": "system se mouse pe click kariye raja ji | सिस्टम पे माऊस से किलिक करिये राजा जी | #shilpiraj",
        "mood": "happy",
       
  })

  const [loading, setLoading] = useState(true);


  return (
    <SongContext.Provider value={{song, setSong, loading, setLoading}}>
      {children}

    </SongContext.Provider>
  )
}
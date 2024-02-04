import { useState, useEffect } from "react"

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState() 

        //para recuperar la imagen cada vez que tenemos una cita nueva
        useEffect(() => {
            if(!fact) return 
            const threeFirstWord = fact.split(' ',3).join(' ')
            console.log(threeFirstWord)
    
            fetch(`https://cataas.com/cat/says/${threeFirstWord}?json=true`)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            const { _id } = response;
            setImageUrl(`${_id}/says/${threeFirstWord}?fontSize=50&fontColor=white?width=400?height=400`);
          });
        }, [fact])

        return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}
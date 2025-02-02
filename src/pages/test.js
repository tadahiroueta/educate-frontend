import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Home() {
    const [card, setflashcards] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setflashcards(result.data))
        .catch(err => console.log(err))
    },[])

    return (
        card.map(card => (
            <div>
                {card.author}
            </div>
        ))
    )
}
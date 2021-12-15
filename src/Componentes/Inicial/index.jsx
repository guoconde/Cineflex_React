import { useEffect, useState } from "react"
import axios from 'axios'

import Topo from "../Genericos/Topo"

export default function Inicial() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const promessa = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies')
        promessa.then(filme => 
            setFilmes(filme.data)
            )
    }, [])
    
    return (
        <>
            <Topo />
            {filmes.map(filme => <img src={filme.posterURL} key={filme.id} />)}
        </>
    )
}
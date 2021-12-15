import { useEffect, useState } from "react"
import axios from 'axios'

import Topo from "../Genericos/Topo"
import './style.css'

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
            <div className="titulo-pagina">Selecione o filme</div>
            {filmes.map(filme => <img src={filme.posterURL} key={filme.id} />)}
        </>
    )
}
import { useEffect, useState } from "react"
import axios from 'axios'

import './style.css'
import { Link } from "react-router-dom"

export default function Inicial() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const promessa = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies')
        promessa.then(filme =>
            setFilmes(filme.data)
        )
    }, [])

    const mapeando = filmes.map(filme =>
        <Link to='/sessoes/:idFilme' id={filme.id} className="poster" >
            <img src={filme.posterURL} key={filme.id} alt={filme.nome} />
        </Link>
        )

    return (
        <>
            <div className="titulo-pagina">Selecione o filme</div>
            <div className="filmes-em-cartaz">
                {mapeando}
            </div>
        </>
    )
}
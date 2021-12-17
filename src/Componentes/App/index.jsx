import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import '../../css/reset.css'
import '../../css/style.css'

import Inicial from '../Inicial'
import Assentos from '../Assento'
import Sessoes from '../Sessao'
import Topo from '../Genericos/Topo'
import Sucesso from '../Sucesso'

export default function App() {
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
            <BrowserRouter >
                <Routes>
                    <Route path='/' element={<Inicial filmes={filmes}/>} />
                    <Route path='/sessoes/:idFilme' element={<Sessoes filmes={filmes}/>} />
                    <Route path='/assentos/:idSessao' element={<Assentos filmes={filmes}/>} />
                    <Route path='/sucesso' element={<Sucesso />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
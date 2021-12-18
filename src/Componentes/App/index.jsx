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
    const [ingressosComprados, setIngressosComprados] = useState('')
    const [filmeEscolhido, setFilmeEscolhido] = useState({})

    useEffect(() => {
        const promessa = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies')
        promessa.then(filme =>
            setFilmes(filme.data)
        )
    }, [])

    function confirmarCompra(dadosCompletos, nomeFilme, dataFilme, horarioFilme) {
        setIngressosComprados(dadosCompletos)
        setFilmeEscolhido({nomeFilme, dataFilme, horarioFilme})
    }

    console.log(filmeEscolhido)

    return (
        <>
            <Topo />
            <BrowserRouter >
                <Routes>
                    <Route path='/' element={<Inicial filmes={filmes}/>} />
                    <Route path='/sessoes/:idFilme' element={<Sessoes filmes={filmes}/>} />
                    <Route path='/assentos/:idSessao' element={<Assentos confirmarCompra={confirmarCompra}/>} />
                    <Route path='/sucesso' element={<Sucesso ingressosComprados={ingressosComprados} filmeEscolhido={filmeEscolhido}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
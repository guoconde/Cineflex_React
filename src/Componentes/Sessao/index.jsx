import './style.css'

import Rodape from '../Genericos/Rodape'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Sessoes({ filmes }) {
    const [sessoes, setSessoes] = useState([])
    const [filmeEscolhido, setFilmeEscolhido] = useState('')

    const { idFilme } = useParams()

    console.log(sessoes)

    useEffect(() => {
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`)
        promessa.then(sessoesDisponiveis => {
            setSessoes(sessoesDisponiveis.data.days)
            setFilmeEscolhido(filmes[idFilme - 1].title)
        }
        )
    }, [])

    return (
        <>
            <div className="titulo-pagina">Selecione o horário</div>
            <div className="sessoes">
                {sessoes === [] ? '' : sessoes.map(
                    (s, i) => <main className="conteudo-sessoes" key={s.id}>
                        <p className="data">{s.weekday} - {s.date}</p>
                        {sessoes[i].showtimes.map(
                            st =>
                                <Link to={`/assentos/${st.id}`} key={st.id}>
                                    <button className="btn-horario">{st.name}</button>
                                </Link>
                        )}
                    </main>)}
            </div>
            <Rodape >
                <div className='poster'>
                    <img src={filmes[idFilme - 1].posterURL} alt="" />
                </div>
                <p className='titulo-rodape'>{filmes[idFilme - 1].title}</p>
            </Rodape>
        </>
    )
}
import './style.css'

import Rodape from '../Genericos/Rodape'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Sessoes({ filmes }) {
    const [sessoes, setSessoes] = useState([])
    const [filmeEscolhido, setFilmeEscolhido] = useState('')

    const { idFilme } = useParams()

    
    useEffect(() => {
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`)
        promessa.then(sessoesDisponiveis => {
            setSessoes(sessoesDisponiveis.data.days)
            setFilmeEscolhido(filmes[idFilme - 1].title)
        }
        )
    }, [])
    
    console.log(sessoes)

    return (
        <>
            <div className="titulo-pagina">Selecione o horário</div>
            <div className="sessoes">
                {sessoes === [] ? '' : sessoes.map(
                    (s, i) => <main className="conteudo-sessoes" key={s.id}>
                        <p className="data">{s.weekday} - {s.date}</p>
                        {sessoes[i].showtimes.map(
                            st => <button className="btn-horario" key={st.id}>{st.name}</button>
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
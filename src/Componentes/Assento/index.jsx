import './style.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Rodape from '../Genericos/Rodape'
import Dados from './Dados'

export default function Assentos() {
    const [horarios, setHorarios] = useState([])
    const [assentos, setAssentos] = useState([])
    const [assentoSelecionado, setAssentoSelecionado] = useState(null)

    const { idSessao } = useParams()

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
            .then(resposta => {
                setHorarios(resposta.data)
                setAssentos(resposta.data.seats)
            })
    }, [])

    function selecionarAssentos(disponivel, teste, aqui) {
        setAssentoSelecionado([...assentos])
        
        if(disponivel) {
            setAssentoSelecionado(teste.isAvailable = 'selecionado')
        }
        setAssentos([...assentos])
    }

    if(horarios.length === 0) {
        return <div>carregando...</div>
    } 

    return (
        <>
            <main className='main-assentos'>
                <div className="titulo-pagina">Selecione o(s) assento(s)</div>
                <div className="todos-assentos">
                    <div className="assentos">
                        {assentos.map((a, i) =>
                            <Cadeira disponivel={a.isAvailable} onClick={() => selecionarAssentos(a.isAvailable, a, i)} key={a.id}>{a.name}</Cadeira>
                        )}
                    </div>
                    <div className="tipos-de-assentos">
                        <div>
                            <Cadeira disponivel='selecionado'></Cadeira>
                            Selecionado
                        </div>
                        <div>
                            <Cadeira disponivel={true} ></Cadeira>
                            Disponível
                        </div>
                        <div>
                            <Cadeira disponivel={false}></Cadeira>
                            Indisponível
                        </div>
                    </div>
                </div>
                <Dados />
            </main>
            <Rodape >
                <div className='poster'>
                    <img src={horarios.movie.posterURL} alt="" />
                </div>
                <p className='titulo-rodape'>{horarios.movie.title}</p>
                <p>Qualquer coisa</p>
            </Rodape>
        </>
    )
}

const Cadeira = styled.div`
    width: 26px;
    height: 26px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 7px 3px;
    
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.04em;
    
    border: 1px solid ${props => props.disponivel === true ? '#808f9d' : props.disponivel === 'selecionado' ? '#1aae9e' : '#F7C52B'}};
    border-radius: 14px;
    
    background-color: ${props => props.disponivel === true ? '#c3cfd9' : props.disponivel === 'selecionado' ? '#8dd7cf' : '#FBE192'}};
`
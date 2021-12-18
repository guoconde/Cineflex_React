import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Rodape from '../Genericos/Rodape'

export default function Assentos({ confirmarCompra }) {
    const [horarios, setHorarios] = useState([])
    const [assentos, setAssentos] = useState([])
    const [assentoSelecionado, setAssentoSelecionado] = useState(null)
    const [contadorAssentos, setContadorAssentos] = useState([])
    const navegar = useNavigate()

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [compradores, setCompradores] = useState([])
    const [dadosCompletos, setDadosCompletos] = useState({})

    const { idSessao } = useParams()

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
            .then(resposta => {
                setHorarios(resposta.data)
                setAssentos(resposta.data.seats)
            })
    }, [])

    function selecionarAssentos(disponivel, assento) {
        setAssentoSelecionado([...assentos])
        let novoArray = []
        let novoCompradores = [...compradores]

        if (disponivel && assento.isAvailable !== 'selecionado') {
            setAssentoSelecionado(assento.isAvailable = 'selecionado')
            novoArray = [...contadorAssentos, assento.id]
            novoCompradores.push({ idAssento: '', nome: '', cpf: '' })
            setCompradores(novoCompradores)
            setContadorAssentos([...novoArray])
        } else if (disponivel) {
            const confirma = window.confirm("Gostaria cancelar a reserva deste assento?")
            if (confirma) {
                setAssentoSelecionado(assento.isAvailable = true)
                novoArray = [...contadorAssentos]
                let index = novoArray.indexOf(assento.id)
                novoArray.splice(index, 1)
                novoCompradores.splice(index, 1)
                setCompradores(novoCompradores)
                setContadorAssentos([...novoArray])
            }
        }
        setAssentos([...assentos])
    }

    const handleDados = (indice, event, idCadeira) => {

        compradores[indice].idAssento = idCadeira
        if (event.target.name === `nome${idCadeira}`) {
            compradores[indice].nome = event.target.value
        } else {
            compradores[indice].cpf = event.target.value
        }
    }

    function pegarDadosCompletos() {
        const array = {
            ids: [...contadorAssentos],
            compradores: ''
        }

        let regex = /[aZ]/

        for (let i = 0; i < compradores.length; i++) {
            if (compradores[i].cpf.length !== 11 || regex.test(compradores[i].cpf)) {
                window.alert(`O cpf do(a) ${compradores[i].nome} está incorreto.`)
                return
            }
        }

        array.compradores = compradores
        setDadosCompletos(array)
        navegar('/sucesso')
        confirmarCompra(array, horarios.movie.title, horarios.day.weekday, horarios.name)

        // axios.post('https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many', array)
    }

    if (horarios.length === 0) {
        return <div>carregando...</div>
    }

    return (
        <>
            <main className='main-assentos'>
                <div className="titulo-pagina">Selecione o(s) assento(s)</div>
                <div className="todos-assentos">
                    <div className="assentos">
                        {assentos.map((a) =>
                            <Cadeira disponivel={a.isAvailable} onClick={() => selecionarAssentos(a.isAvailable, a)} key={a.id}>{a.name}</Cadeira>
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
                {contadorAssentos.map((idOrigem, indice) =>
                    <div className="dados" key={idOrigem}>
                        <p className="titulo-dados" style={{ marginBottom: '5px' }} >Assento: {idOrigem.toString().slice(-2)}</p>
                        <p className='titulo-dados'>Nome do comprador:</p>
                        <Input type="text" name={`nome${idOrigem}`} onChange={(event) => handleDados(indice, event, idOrigem)} value={nome.name} placeholder='Digite seu nome...' />
                        <p className='titulo-dados'>CPF do comprador:</p>
                        <Input type="text" maxLength={11} name={`cpf${idOrigem}`} onChange={(event) => handleDados(indice, event, idOrigem)} value={cpf.name} placeholder='Digite seu CPF...' />
                    </div>
                )}
                <button className='btn-reservar' onClick={() => pegarDadosCompletos()} >
                    Reservar Assento(s)
                </button>
            </main>
            <Rodape >
                <div className='poster'>
                    <img src={horarios.movie.posterURL} alt="" />
                </div>
                <TituloFilme>
                    <p className='titulo-rodape'>{horarios.movie.title}</p>
                    <p className='titulo-rodape'>{horarios.day.weekday} - {horarios.name}</p>
                </TituloFilme>
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

const Input = styled.input`
    width: 100%;
    height: 50px;

    margin-top: 5px;
    margin-bottom: 10px;

    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    line-height: 21px;
    color: #293845;

    padding-left: 20px;
    border: 1px solid #afafaf;
`

const TituloFilme = styled.div`
    display: flex;
    flex-direction: column;
`
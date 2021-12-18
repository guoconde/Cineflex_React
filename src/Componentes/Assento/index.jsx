import './style.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Rodape from '../Genericos/Rodape'

export default function Assentos() {
    const [horarios, setHorarios] = useState([])
    const [assentos, setAssentos] = useState([])
    const [assentoSelecionado, setAssentoSelecionado] = useState(null)
    const [contadorAssentos, setContadorAssentos] = useState([])

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

    const handleDados = (indice, event, idCadeira) => {
        const array = [...compradores]

        console.dir(event.target)

        array[indice].idAssento = idCadeira
        if(event.target.name === `nome${idCadeira}`) {
            array[indice].nome = event.target.value
        } else {
            array[indice].cpf = event.target.value
        }
    }

       function selecionarAssentos(disponivel, assento) {
        setAssentoSelecionado([...assentos])
        let novoArray = []
        let testa = [...compradores]
        
        if (disponivel && assento.isAvailable !== 'selecionado') {
            setAssentoSelecionado(assento.isAvailable = 'selecionado')
            novoArray = [...contadorAssentos, assento.id]
            testa.push({idAssento: '', nome: '', cpf: ''})
            setCompradores(testa)
            setContadorAssentos([...novoArray])
        } else if (disponivel) {
            setAssentoSelecionado(assento.isAvailable = true)
            novoArray = [...contadorAssentos]
            let index = novoArray.indexOf(assento.id)
            novoArray.splice(index, 1)
            testa.splice(index, 1)
            setCompradores(testa)
            setContadorAssentos([...novoArray])
        }
        setAssentos([...assentos])
        console.log(testa)
    }


    function handleCpf(e) {
        let recebido = e.target.value
        let regex = /^[0-9]{0,11}$/
        let regexTamanho = /^[0-9]{11}$/
        let cpfValido

        if (regex.test(recebido)) {
            setCpf(e.target.value)
        }
        if (regexTamanho.test(cpf) && !e.nativeEvent.inputType == 'deleteContentBackward') {
            setCpf(cpfValido)
        }
    }

    function teste() {
        const array = {
            ids: [...contadorAssentos],
            compradores: ''
        }

        array.compradores = compradores

        setDadosCompletos(array)

    }

    if (horarios.length === 0) {
        return <div>carregando...</div>
    }

    console.log(dadosCompletos)
    
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
                {contadorAssentos.map((c, i) =>
                    <div className="dados" key={c}>
                        <p className='titulo-dados'>Nome do comprador:</p>
                        <Input type="text" name={`nome${c}`} onChange={(event) => handleDados(i, event, c)} value={nome.name} placeholder='Digite seu nome...' />
                        <p className='titulo-dados'>CPF do comprador:</p>
                        <Input type="number" name={`cpf${c}`} onChange={(event) => handleDados(i, event, c)} value={cpf.name} placeholder='Digite seu CPF...' />
                    </div>
                )}
                <button className='btn-reservar' onClick={() => teste()} >Reservar Assento(s)</button>
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
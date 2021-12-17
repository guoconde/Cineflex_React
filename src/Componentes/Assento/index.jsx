import './style.css'

import Rodape from '../Genericos/Rodape'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Assentos() {
    const [horarios, setHorarios] = useState([])
    const [assentos, setAssentos] = useState([])

    console.log(horarios)
    console.log(assentos)

    useEffect(() => {
        axios.get('https://mock-api.driven.com.br/api/v4/cineflex/showtimes/16/seats')
            .then(resposta => {
                setHorarios(resposta.data)
                setAssentos(resposta.data.seats)
            })
    }, [])


    return (
        <>
            <main className='main-assentos'>
                <div className="titulo-pagina">Selecione o(s) assento(s)</div>
                <div className="todos-assentos">
                    <div className="assentos">
                        {assentos.map(a =>
                            <div className="assento" isavailiable={a.isAvailiable} key={a.id}>{a.name}</div>
                        )}
                    </div>
                    <div className="tipos-de-assentos">
                        <div>
                            <div className="assento selecionado"></div>
                            Selecionado
                        </div>
                        <div>
                            <div className="assento disponivel"></div>
                            Disponível
                        </div>
                        <div>
                            <div className="assento indisponivel"></div>
                            Indisponível
                        </div>
                    </div>
                </div>
                <div className="dados">
                    <p className='titulo-dados'>Nome do comprador:</p>
                    <input type="text" placeholder='Digite seu nome...' />
                    <p className='titulo-dados'>CPF do comprador:</p>
                    <input type="text" placeholder='Digite seu CPF...' />
                </div>
                <button className='btn-reservar'>Reservar Assento(s)</button>
            </main>
            <Rodape />
        </>
    )
}
import './style.css'

import Rodape from '../Genericos/Rodape'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Assentos() {

    const [horarios, setHorarios] = useState([])

    console.log(horarios)

    useEffect(() => {
        axios.get('https://mock-api.driven.com.br/api/v4/cineflex/showtimes/16/seats')
            .then(resposta =>
                setHorarios(resposta.data)
            )

    }, [])


    return (
        <>
            <main className='main-assentos'>
                <div className="titulo-pagina">Selecione o(s) assento(s)</div>
                <div className="todos-assentos">
                    <div className="assentos">
                        <div className="assento">1</div>
                        <div className="assento">2</div>
                        <div className="assento">3</div>
                        <div className="assento">4</div>
                        <div className="assento">5</div>
                        <div className="assento">6</div>
                        <div className="assento">7</div>
                        <div className="assento">8</div>
                        <div className="assento">9</div>
                        <div className="assento">10</div>
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
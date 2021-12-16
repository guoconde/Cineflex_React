import './style.css'

import Rodape from '../Genericos/Rodape'

export default function Sessoes() {
    return (
        <>
            <div className="titulo-pagina">Selecione o horário</div>
            <div className="sessoes">
                <main className="conteudo-sessoes">
                    <p className="data">Quinta-feira - 24/06/2021</p>
                    <button className="btn-horario">15:00</button>
                    <button className="btn-horario">19:00</button>
                </main>
                <main className="conteudo-sessoes">
                    <p className="data">Sexta-feira - 25/06/2021</p>
                    <button className="btn-horario">15:00</button>
                    <button className="btn-horario">19:00</button>
                </main>
            </div>
            <Rodape />
        </>
    )
}
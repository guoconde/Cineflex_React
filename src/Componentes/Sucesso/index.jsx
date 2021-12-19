import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Assentos({ ingressosComprados, filmeEscolhido }) {

    const { compradores } = ingressosComprados

    const navegar = useNavigate()

    return (
        <>
            <main className='main-sucesso'>
                <div className="titulo-sucesso">Pedido feito <br /> com sucesso!</div>
                <div className="todos-assentos">
                    <div className="confirmado">
                        <p>Filme e sessão</p>
                        <div className='dados-sucesso'>
                            <p>{filmeEscolhido.nomeFilme}</p>
                            <p>{filmeEscolhido.dataFilme} - {filmeEscolhido.horarioFilme}</p>
                        </div>
                    </div>
                    {compradores.map((comprador, indice) =>
                        <div className="confirmado" key={indice}>
                            <p>Ingresso:</p>
                            <div className='dados-sucesso'>
                                <p>Assento: {
                                    filmeEscolhido.horarioFilme === '19:00' ?
                                        (comprador.idAssento - 50).toString().slice(-2) :
                                        comprador.idAssento.toString().slice(-2)}
                                </p>
                                <p>Nome: {comprador.nome}</p>
                                <p>CPF: {comprador.cpf}</p>
                            </div>
                        </div>
                    )}
                </div>
                <button className='btn-voltar' onClick={() => navegar('/')}>
                    Voltar para Home
                </button>
            </main>
        </>
    )
}
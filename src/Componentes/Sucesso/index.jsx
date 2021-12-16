import './style.css'

export default function Assentos() {
    return (
        <>
            <main className='main-sucesso'>
                <div className="titulo-sucesso">Pedido feito <br /> com sucesso!</div>
                <div className="todos-assentos">
                    <div className="confirmado">
                        <p>Filme e sessão</p>
                        <div className='dados-sucesso'>
                            <p>Enola Holmes</p>
                            <p>24/06/2021 15:00</p>
                        </div>
                    </div>
                    <div className="confirmado">
                        <p>Ingressos</p>
                        <div className='dados-sucesso'>
                            <p>Assento 15</p>
                            <p>Assento 16</p>
                        </div>
                    </div>
                    <div className="confirmado">
                        <p>Comprador</p>
                        <div className='dados-sucesso'>
                            <p>Nome: João da Silva Sauro</p>
                            <p>CPF: 123.456.789-10</p>
                        </div>
                    </div>
                </div>
                <button className='btn-voltar'>Voltar para Home</button>
            </main>
        </>
    )
}
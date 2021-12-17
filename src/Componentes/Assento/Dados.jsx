export default function Dados() {
    return (
        <>
            <div className="dados">
                <p className='titulo-dados'>Nome do comprador:</p>
                <input type="text" placeholder='Digite seu nome...' />
                <p className='titulo-dados'>CPF do comprador:</p>
                <input type="text" onChonge={e => e.target.value} value={0} placeholder='Digite seu CPF...' />
            </div>
            <button className='btn-reservar'>Reservar Assento(s)</button>
        </>
    )
}
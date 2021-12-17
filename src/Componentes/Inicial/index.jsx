import './style.css'
import { Link } from "react-router-dom"

export default function Inicial({ filmes }) {

    const mapeando = filmes.map(filme =>
        <Link to={`/sessoes/${filme.id}`} key={filme.id} className="poster" >
            <img src={filme.posterURL}  alt={filme.nome} />
        </Link>
        )

    return (
        <>
            <div className="titulo-pagina">Selecione o filme</div>
            <div className="filmes-em-cartaz">
                {mapeando}
            </div>
        </>
    )
}
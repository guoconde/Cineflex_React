import './style.css'
import { Link } from "react-router-dom"

export default function Inicial({ filmes }) {

    return (
        <>
            <div className="titulo-pagina">Selecione o filme</div>
            <div className="filmes-em-cartaz">
                {filmes.map(filme =>
                    <Link to={`/sessoes/${filme.id}`} key={filme.id} className="poster" >
                        <img src={filme.posterURL} alt={filme.nome} />
                    </Link>)}
            </div>
        </>
    )
}
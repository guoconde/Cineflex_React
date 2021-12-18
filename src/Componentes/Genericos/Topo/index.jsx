import styled from 'styled-components'
import './style.css'
import { useNavigate } from 'react-router-dom'

export default function Topo() {

    let navegar = useNavigate()

    return (
        <>
            <div className="topo">
                CINEFLEX
            </div>
            {window.location.pathname==="/" ? "" : <BotaoVoltar onClick={() => navegar(-1)}>Voltar</BotaoVoltar>}
        </>
    )
}

const BotaoVoltar = styled.button ` 
    position: fixed;
    z-index: 2;
    top: 23px;
    left: 15px;
`
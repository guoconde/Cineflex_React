import { useState } from "react"
import styled from "styled-components"

export default function Dados(props) {


    function handleCpf(e) {
        let recebido = e.target.value
        let regex = /^[0-9]{0,11}$/
        let regexTamanho = /^[0-9]{11}$/
        let cpfValido

        if(regex.test(recebido)) {
            props.setCpf(e.target.value)
        }
        if(regexTamanho.test(props.cpf) && !e.nativeEvent.inputType == 'deleteContentBackward') {
            props.setCpf(cpfValido)
        }
    }

    return (
        <>
            <div className="dados">
                <p className='titulo-dados'>Nome do comprador:</p>
                <Input type="text" onChange={e => props.setNome(e.target.value)} value={props.nome} placeholder='Digite seu nome...' />
                <p className='titulo-dados'>CPF do comprador:</p>
                <Input type="text" onChange={e => handleCpf(e)} value={props.cpf} placeholder='Digite seu CPF...' />
            </div>
            
        </>
    )
}

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
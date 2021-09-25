import React, { useState, useEffect } from 'react'
import { Container,Button, Form } from 'react-bootstrap'
import getFiles from './../../js/Files'
import getData from './../../js/Data'

import $ from 'jquery'
import "./index.css"

function Files(){
    const [arquivos,setArquivos] = useState([])
    async function loadFiles(){
        await getFiles().then((res)=>{
            setArquivos(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function loadData(e){
        e.preventDefault()
        let nome_arquivo = $("#select-arquivo option:selected").val();
        await getData(nome_arquivo).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        loadFiles()
    },[])
    return (
        <Container id="files">
            <Form onSubmit={loadData}>
                <Form.Select id="select-arquivo" aria-label="">
                    {arquivos.map((arquivo, index) => ( 
                        <option value={arquivo.nome}>{arquivo.nome}</option>
                    ))}
                </Form.Select>
                <Button type="submit">Consultar</Button>
            </Form>
        </Container>
    )
}

export default Files;

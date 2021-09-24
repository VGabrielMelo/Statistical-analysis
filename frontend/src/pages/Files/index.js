import React, { useState, useEffect } from 'react'
import { Container,Button, Form } from 'react-bootstrap'
import getFiles from './../../js/Files'
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
    useEffect(() => {
        loadFiles()
    },[])
    return (
        <Container id="files">
            <Form>
                <Form.Select aria-label="">
                    {arquivos.map((arquivo, index) => ( 
                        <option value={arquivo.nome}>{arquivo.nome}</option>
                    ))}
                </Form.Select>
            </Form>
        </Container>
    )
}

export default Files;

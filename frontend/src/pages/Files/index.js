import React, { useState, useEffect } from 'react'
import { Container,Button, Form, Table } from 'react-bootstrap'
import getFiles from './../../js/Files'
import getData from './../../js/Data'

import $ from 'jquery'
import "./index.css"

function Files(){
    const [arquivos,setArquivos] = useState([])
    const [data,setData] = useState({classes:[]})

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
            $("#tabela").css("display","table")
            setData(res.data)
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
                </Form.Select> <br />
                <Button type="submit">Consultar</Button>
            </Form>
            <br />
            <Table id="tabela" striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th id="th-classe">Classe</th>
                    <th>Frequência absoluta</th>
                    <th>Frequência relativa</th>
                    <th>Frequência absoluta acumulada</th>
                    <th>Frequência relativa acumulada</th>
                  </tr>
                </thead>
                <tbody>
                    {data.classes.map((classe, index) => ( 
                        <tr>
                            <td>{index}</td>
                            <td>{classe[0]}---{classe[1]}</td>
                            <td>{classe[2][0]}</td>
                            <td>{classe[3][0]}%</td>
                            <td>{classe[2][1]}</td>
                            <td>{classe[3][1]}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Files;

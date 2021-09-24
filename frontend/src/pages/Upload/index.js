/* import { React, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import uploadArquivo from './../../js/Upload'
import $ from 'jquery'
import "./index.css"

function Upload(){
    // ./../../../../assets/files
    const uploadFile = (e) =>{
        e.preventDefault()
        let arquivo = $("#arquivo").val()

        uploadArquivo(arquivo).then(()=>{

        })
        .catch(()=>{

        })
    }
    return (
        <Container id="upload">
            <Form onSubmit={uploadFile}>
                <Form.Group className="mb-3" controlId="formGroupArquivo">
                    <Form.Label>Entre com o endereço do arquivo</Form.Label>
                    <Form.Control type="text" id="arquivo" placeholder="C://arquivo/exemplo" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    )
}

export default Upload; */


import { React, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import uploadArquivo from './../../js/Upload'
import $ from 'jquery'
import "./index.css"

function Upload(){

    const [arquivo,setArquivo] = useState()
    const uploadFile = (e) =>{
        e.preventDefault()
        uploadArquivo(arquivo).then(()=>{
        })
        .catch(()=>{

        })
    }
    return (
        <Container id="upload">
            <Form encType="multipart/form-data" onSubmit={uploadFile}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Faça o upload do arquivo.</Form.Label>
                    <Form.Control onChange={(e)=>setArquivo(e.target.files[0])} id="arquivo" name="arquivo" type="file" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    )
}

export default Upload;

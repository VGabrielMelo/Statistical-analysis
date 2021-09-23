import { React, useState } from 'react'
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
            <Form /*encType="multipart/form-data"*/ onSubmit={uploadFile}>
                {/* <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Faça o upload do arquivo.</Form.Label>
                    <Form.Control id="arquivo" name="arquivo" type="file" />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Entre com o endereço do arquivo</Form.Label>
                    <Form.Control type="text" placeholder="C://arquivo/exemplo" />
                    <Form.Text className="text-muted">
                        Colocar arquivo sem a extensão
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    )
}

export default Upload;
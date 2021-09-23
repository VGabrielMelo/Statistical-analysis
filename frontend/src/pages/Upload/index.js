import { React, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaMarker,FaHome } from 'react-icons/fa'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import uploadArquivo from './../../js/Upload'
import $ from 'jquery'
import "./index.css"

function Upload(){
    const uploadFile = () =>{
        let arquivo = $("#arquivo")
        let nome_arquivo = arquivo.val();
        uploadArquivo(arquivo,nome_arquivo).then(()=>{

        })
        .catch(()=>{

        })
    }
    return (
        <Container id="upload">
            <Form onSubmit={uploadFile}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Faça o upload do arquivo.</Form.Label>
                    <Form.Control id="arquivo" type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    )
}

export default Upload;
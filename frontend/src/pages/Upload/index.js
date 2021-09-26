import { React, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import uploadArquivo from './../../js/Upload'
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
                    <Form.Control accept=".csv" onChange={(e)=>setArquivo(e.target.files[0])} id="arquivo" name="arquivo" type="file" />
                    <Form.Text className="text-muted">
                        Apenas arquivos csv são aceitos. <br />
                        OBS: Deixe a primeira e ultima linha do arquivo vazia.
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

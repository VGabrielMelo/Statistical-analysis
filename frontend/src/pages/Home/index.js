import { React, useState } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import Upload from '../Upload';
import Files from '../Files';

import "./index.css"

function Home(){
    const [conteudo, setConteudo] = useState();

    const renderUpload = () =>(setConteudo(<Upload />))

    const renderFiles = () =>(setConteudo(<Files />))

    return (
        <Container id="home" fluid>
            <Row id="home-body">
                <Col xs={3} id="col-menu">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link onClick={renderUpload}>Upload de arquivos</Nav.Link>
                        <Nav.Link onClick={renderFiles}>Consulta de arquivos</Nav.Link>
                    </Nav>
                </Col>
                <Col id="col-body">
                    {conteudo}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
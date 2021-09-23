import { React, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaMarker,FaHome } from 'react-icons/fa'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import Upload from '../Upload';
import "./index.css"

function Home(){
    const [conteudo, setConteudo] = useState();
    const hist = useHistory();

    const logout = () =>((
        localStorage.removeItem("token"),
        hist.push("/")
    ))

    const renderUpload = () =>(setConteudo(<Upload />))

    const renderConsulta = () =>((
        localStorage.removeItem("token"),
        hist.push("/")
    ))
    return (
        <Container id="home" fluid>
            <Row id="home-body">
                <Col xs={3} id="col-menu">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link onClick={renderUpload}>Upload de arquivos</Nav.Link>
                        <Nav.Link onClick={renderConsulta}>Consulta de arquivos</Nav.Link>
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
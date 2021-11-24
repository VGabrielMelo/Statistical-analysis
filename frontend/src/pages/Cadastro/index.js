import React, { useState} from 'react'
import { useHistory } from "react-router-dom";
import { Button, Form, Container } from 'react-bootstrap';
import Alert from '../../components/alert'
import api from '../../utils/api';
import "./index.css"

const Cadastro = () => {
    const history = useHistory();
    const redirectLogin = () => history.push("/")
    const [usuario, setUsuario] = useState({ mail: "", senha: "", perfil: "" })
    const [alertDiv, setAlertDiv] = useState([])

    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleCadastro = (e) => {
        e.preventDefault()
        let data = { ...usuario }
        data.perfil = "user"
        api.post("/usuario/create", data).then((res) => {
            if (res.status === 200) {
                setAlertDiv([<Alert tema="success" conteudo="Usuário cadastrado com sucesso." />])
                setTimeout(() => {redirectLogin()},3000)
            }

        }).catch(err => {
            let errors = []

            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
            setAlertDiv(errors)
        })
    }

    return (
        <Container id="cadastro" fluid>
            
            <Form id="cadastro-form" onSubmit={handleCadastro}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="mail" value={usuario.mail} onChange={handleChange} placeholder="email@email.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control value={usuario.senha} name="senha" onChange={handleChange}  type="password"/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">Cadastrar</Button>
                </div>
                <br />
                <div className="d-grid gap-2">
                    <Button onClick={redirectLogin} variant="primary">Voltar para o login</Button>
                </div>
            </Form>
            
        </Container>
    )
}

export default Cadastro

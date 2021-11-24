import { React, useState } from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { useUser } from "../../providers/user"
import api from '../../utils/api';
import Alert from '../../components/alert';
import "./index.css"

const Login = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const history = useHistory();
    const redirectHome = () => history.push("/home")
    const redirectCadastro = () => history.push("/cadastro")

    const { user, setUser } = useUser()
    const [usuario, setUsuario] = useState({ mail: "", senha: ""})
    const [alertDiv, setAlertDiv] = useState([])

    
    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        api.get("/usuario/login", usuario).then((res) => {
            let token = res.data.token
            let perfil = res.data.perfil
            let idusuario = res.data.idusuario
            localStorage.setItem("token", token)
            localStorage.setItem("perfil", perfil)
            localStorage.setItem("idusuario", idusuario)

            setUser({ token: token, perfil: perfil, idusuario: idusuario })
            redirectHome()

        }).catch(err => {
            let errors = []

            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            })
            setAlertDiv(errors)
        })
    }
    return (
    <Container id="login" fluid>
            
    <Form id="login-form" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="mail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="mail" value={usuario.mail} onChange={handleChange} placeholder="email@email.com" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control value={usuario.senha} name="senha" onChange={handleChange}  type="password" required/>
        </Form.Group>
        <div className="d-grid gap-2">
            <Button variant="primary" type="submit">Entrar</Button>
        </div>
        <br />
        <div className="d-grid gap-2">
            <Button block color="secondary" type="button" onClick={redirectCadastro}>Cadastro</Button>
        </div>
    </Form>
    </Container>
    )
}

export default Login

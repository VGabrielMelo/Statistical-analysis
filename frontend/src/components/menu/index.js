import React from 'react'
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';
import { useUser } from '../../providers/user';
 
const Menu = () => {
    const { user } = useUser()

    const history = useHistory();

    const redirectUpload = () => history.push("/Upload")
    const redirectHome = () => history.push("/Home")
    const redirectFiles = () => history.push("/Files")
    const logout = () => {
        localStorage.clear()
        history.push("/")

    }

    return (
        <div>
        <Nav className="flex-column">
            <center>
                <br />
                <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                <Nav.Link onClick={redirectUpload}>Upload de arquivos</Nav.Link>
                <Nav.Link onClick={redirectFiles}>Consultar arquivos</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>


            </center>
        </Nav>
        </div>
    )
}

export default Menu

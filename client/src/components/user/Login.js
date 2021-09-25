import axios from "axios";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import UserContext from "../../context/UserContext";
import "./style/login.css";

const Login = () => {

    const history = useHistory();

    const context = useContext(UserContext);

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const login = (e) => {
        e.preventDefault();
        axios.post('/api/user/login', inputs)
            .then(resp => {
                if (resp.data.success) {
                    context.setUser(resp.data.user);
                    sessionStorage.setItem('USER_DATA', JSON.stringify(resp.data.user));
                    history.push('/pirates');
                }
            }).catch(err => {
                Swal.fire('Error', err.response.data.message, 'error');
            });
    }

    return (<div className="login">
        <Form onSubmit={login}>
            <h1>Iniciar Sesión</h1>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input type="email" name="email" value={inputs.email} onChange={updateFormValue} required />
                    </FormGroup>
                </Col>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Contraseña</Label>
                        <Input type="password" name="password" value={inputs.password} onChange={updateFormValue} required />
                    </FormGroup>
                </Col>
                <Col xs={12} className="mt-3">
                    <Button type="submit" color="primary">Entrar</Button>
                </Col>
            </Row>
        </Form>
    </div>

    )

}

export default Login;
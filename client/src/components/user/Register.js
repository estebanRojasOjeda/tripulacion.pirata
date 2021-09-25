import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import "./style/register.css";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {

    const [newUser, setNewUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        })
    }

    const register = (e) => {
        e.preventDefault();
        axios.post('/api/user/register', newUser)
            .then(resp => {
                setNewUser(initialState);
                Swal.fire('Registrado con éxito', 'Datos almacenados', 'success');
            }).catch(err => {
                for (let field in err.response.data.errors) {
                    setErrors({
                        ...errors,
                        [field]: err.response.data.errors[field].message
                    });
                }
            });

    }

    return (
        <div className="register">
            <h1>Registro</h1>
            <Form onSubmit={register}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="tex" name="firstName" value={newUser.firstName} onChange={updateFormValue} required />
                            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Apellido</Label>
                            <Input type="tex" name="lastName" value={newUser.lastName} onChange={updateFormValue} required />
                            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="email" name="email" value={newUser.email} onChange={updateFormValue} required/>
                            {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input type="password" name="password" value={newUser.password} onChange={updateFormValue} required />
                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Confirmar contraseña</Label>
                            <Input type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={updateFormValue} required />
                            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="mt-3">
                        <Button type="submit" color="primary">Registrarse!</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Register;
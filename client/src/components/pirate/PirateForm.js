import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./style/pirate-form.css";

const initialState = {
    name: '',
    position: '',
    imageUrl: '',
    treasure: 0,
    Phrase: '',
    PegLeg: true,
    EyePatch: true,
    HookHand: true
}

const initialErrors = {
    name: '',
    position: '',
    imageUrl: '',
    treasure: '',
    Phrase: '',
    PegLeg: '',
    EyePatch: '',
    HookHand: ''
}

const PirateForm = (props) => {

    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const hist = useHistory();

    const { id } = useParams();

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const save = (e) => {
        e.preventDefault();
        if (props.new) {
            axios.post('/api/pirate/new', inputs)
                .then(resp => {
                    hist.push('/pirates')
                }).catch(err => {
                    for (let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
        } else if (props.edit) {
            axios.put('/api/pirate/' + id, inputs)
                .then(resp => {
                    hist.push('/pirates')
                }).catch(err => {
                    for (let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
        }

    }

    useEffect(() => {
        if (props.view || props.edit) {
            axios.get('/api/pirate/' + id)
                .then(resp => {
                    setInputs(resp.data);
                }).catch(err => console.log(err));
        }
    }, []);

    const back = (e) => {
        hist.push('/pirates');
    }

    return (
        <div className="register">
            <Form onSubmit={save}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="tex" name="name" value={inputs.name} onChange={updateFormValue} required />
                            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label for="position">Posicion</Label>
                            {/*
                                <Input type="select" name="position" id="position" name="position" onChange={updateFormValue}>
                                    <option value={'Capitan'} >Capitan</option>
                                    <option value={'Maestro cocinero'} >Maestro cocinero</option>
                                    <option value={'Negociador'} >Negociador</option>
                                    <option value={'Experto en armas'} >Experto en armas</option>

                                </Input>*/
                            }
                            <Input type="tex" name="position" value={inputs.position} onChange={updateFormValue} required />
                            {errors.position && <span style={{ color: 'red' }}>{errors.position}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Url Imagen</Label>
                            <Input type="tex" name="imageUrl" value={inputs.imageUrl} onChange={updateFormValue} required />
                            {errors.imageUrl && <span style={{ color: 'red' }}>{errors.imageUrl}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Tesoros</Label>
                            <Input type="number" name="treasure" value={inputs.treasure} onChange={updateFormValue} required />
                            {errors.treasure && <span style={{ color: 'red' }}>{errors.treasure}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Frase</Label>
                            <Input type="tex" name="Phrase" value={inputs.Phrase} onChange={updateFormValue} required />
                            {errors.Phrase && <span style={{ color: 'red' }}>{errors.Phrase}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" name="PegLeg" value={inputs.PegLeg} onChange={updateFormValue} required  checked="checked"/> Pierna de palo
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" name="EyePatch" value={inputs.EyePatch} onChange={updateFormValue} required checked="checked"/> Parche en el ojo
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" name="HookHand" value={inputs.HookHand} onChange={updateFormValue} required checked="checked"/> Mano de garfio
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="mt-3">
                        {!props.view && <Button type="submit">Save</Button>}
                        <Button style={{ marginLeft: '10px' }} type="button" onClick={back}>Back</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default PirateForm;
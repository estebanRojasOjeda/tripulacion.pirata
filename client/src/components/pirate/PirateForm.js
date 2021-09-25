import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const initialState= {
    name: '',
    price: 0
}

const initialErrors = {
    name: '',
    price: ''
}

const PirateForm = (props) => {

    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const hist = useHistory();

    const {id} = useParams();

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const save = (e) => {
        e.preventDefault();
        if(props.new) {
            axios.post('/api/fruit/new', inputs)
                .then(resp => {
                    hist.push('/main')
                }).catch( err => {
                    for(let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
        } else if(props.edit) {
            axios.put('/api/fruit/'+id, inputs)
                .then(resp => {
                    hist.push('/main')
                }).catch( err => {
                    for(let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
        }

    }

    useEffect(() => {
        if(props.view || props.edit) {
            axios.get('/api/fruit/' + id)
                .then(resp => {
                    setInputs(resp.data);
                }).catch(err => console.log(err));
        }
    }, []);

    const back = (e) => {
        hist.push('/main');
    }
  
    return (
        <Form onSubmit={save}>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input type="tex" name="name" value={inputs.name} onChange={updateFormValue} required minLength={2} readOnly={props.view}/>
                        {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                    </FormGroup>
                </Col>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Price</Label>
                        <Input type="number" name="price" value={inputs.price} onChange={updateFormValue} required readOnly={props.view}/>
                        {errors.price && <span style={{color: 'red'}}>{errors.price}</span>}
                    </FormGroup>
                </Col>
               
                <Col xs={12} className="mt-3">
                    { !props.view && <Button type="submit">Save</Button>}
                    <Button style={{marginLeft: '10px'}} type="button" onClick={back}>Back</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default PirateForm;
import { useContext, useEffect } from "react";
import { Col, Row, Card, CardTitle, CardText, Button, Table } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

const List = (props) => {
    const hist = useHistory();

    const context = useContext(UserContext);

    useEffect(() => {
        axios.get('/api/pirate/all')
            .then(resp => {
                props.setPirates(resp.data.pirates);
                console.log(resp.data)
            }).catch(err => Swal.fire('Error al traer piratas', 'Error al tratar de listar', 'error'));
    }, []);

    const deleteFn = (e, p) => {
        Swal.fire({
            title: 'Eliminar pirata',
            text: 'Estas seguro/a?',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'No',
            showCancelButton: true,
            icon: 'warning'
        }).then(resp => {
            if (resp.value) {
                axios.delete('/api/pirate/' + p._id)
                    .then(resp => {
                        const prods = props.pirates.filter(prd => prd._id != p._id);
                        props.setPirates(prods);
                        Swal.fire('Pirata eliminado', 'eliminado de registros', 'success');
                    })
                    .catch(err => Swal.fire('Pirata no eliminado', 'ups, favor contactar al admin', 'error'));
            }
        })
    }


    return (
        <Row>
            <Col xs={12}>
             

                    {props.pirates.map((p, i) => {
                        return (<div key={i} style={{backgroundColor:'white', margin:'10px', padding:'10px', border:'2px solid #000'}}>
                            <h3>{p.name}</h3>
                            <td></td>
                            <Button color="primary" style={{marginRight:'10px'}}><Link to={`/pirates/view/${p._id}`} style={{color:'white'}}>Ver pirata</Link></Button>
                            <Button color="danger"><a onClick={e => deleteFn(e, p)}>Lanzar por la tabla</a></Button>
                         
                        </div>
                        )
                    }
                    )
                    }


                  
            </Col>
        </Row>
    )
}

export default List;

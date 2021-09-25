import { useContext, useEffect } from "react";
import { Col, Row, Table } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillTrashFill, BsPencil } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import UserContext from "../../context/UserContext";

const List = (props) => {

    const context = useContext(UserContext);
    
    useEffect(() => {
        axios.get('/api/fruit/all')
            .then(resp => {
                props.setFruits(resp.data.fruits);
            }).catch(err => Swal.fire('Error getting products', 'Error getting the products list', 'error'));
    }, []);

    const deleteFn = (e, p) => {
        Swal.fire({
            title: 'Delete Prodcuts',
            text: 'Are you sure?',
            confirmButtonText: 'Yes, delete!!',
            cancelButtonText: 'No',
            showCancelButton: true,
            icon: 'warning'
        }).then(resp => {
            if(resp.value) {
                axios.delete('/api/fruit/'+p._id)
                    .then(resp => {
                        const prods = props.fruits.filter(prd => prd._id != p._id);
                        props.setFruits(prods);
                        Swal.fire('Product deleted', 'Products deleted successful', 'success');
                    })
                    .catch(err => Swal.fire('Product deleted', 'Products deletion failed', 'error'));
            }
        })
    } 

    const buy = (e, p) => {
        axios.patch('/api/fruit/'+p._id)
            .then(resp => {
                const data = resp.data;
                const prds = [...props.fruits];
                const index = prds.findIndex(prd => prd._id == data._id);
                prds.splice(index, 1, data);
                props.setFruits(prds);
                context.socket.emit('buy_event', data);
            }).catch(err => Swal.fire('Error buying product', 'Error buying the product', 'error'));
    }
/*
    context.socket.on("buy_product_event", data => {
        const prds = [...props.products];
        const index = prds.findIndex(prd => prd._id == data._id);
        prds.splice(index, 1, data);
        props.setProducts(prds);
    })
*/
    return (
        <Row>
            <Col xs={12}>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            <th>Comprar</th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.fruits.map((p, i) => 
                           { return (<tr key={i}>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td><Link to={`/main/view/${p._id}`}><BsFillEyeFill/></Link> </td>
                                <td><Link to={`/main/edit/${p._id}`}><BsPencil/></Link></td>
                                <td><a onClick={e => deleteFn(e, p)}><BsFillTrashFill/></a></td>
                                <td><a onClick={e => buy(e, p)}><AiFillDollarCircle/></a></td>
                            </tr>
                           )
                           }
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default List;

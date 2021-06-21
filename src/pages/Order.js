import React, { Component } from 'react';
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from '@material-ui/core';
import './Form.css';
import {
    Modal,
    ModalHeader,
    Modalclose,
    Modaltitle,
    Modalcontent,
    ModalBody,
    Modalfooter,
    Card,
    Head,
    Btn
} from './support/Order.elements';
export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: '',
            val: false,
            up: false,
            upid: '',
            values: [],
            deliver: false,
            name: '',
            deliverdata: [],
            deliverid: '',
            statuschange: '',
            apiurl: process.env.REACT_APP_SERVER_URL,
        }
        this.getData = this.getData.bind(this);
        this.getDelivery = this.getDelivery.bind(this);
        this.Adddelivery = this.Adddelivery.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.deliveryChange = this.deliveryChange.bind(this);
    }
    closeModelHandeler = () => this.setState({ val: false });
    handelIncrement = e => {
        this.props.value = 1;
        this.setState({ count: this.state.count + 1 })
    };
    componentDidMount() {
        this.getData();
        this.getDelivery();
    }
    componentWillUnmount() {
        this.getData();
        this.getDelivery();
    }
    componentDidUpdateMount() {
        this.getData();
        this.getDelivery();
    }
    getData = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/orders?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        this.setState({ data: data });
        this.setState({ val: false })
    }
    getDelivery = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/staff?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        this.setState({
            deliverdata: data
        });
    }
    handelDelete = (item) => {
        const data = this.state.data.filter(data => data.id !== item);
        this.setState({ data: data });
    };
    handelAdd = () => {
        this.setState({ val: true });
    };
    upda = (id) => {
        this.setState({ upid: id })
        this.setState({ val: true });
    }
    adddel = (id) => {
        this.setState({ deliver: true });
    }
    handelChange = e => {
        this.setState({
            values: ({
                [e.target.name]: e.target.values
            })
        })
    }
    handelSubmit = async (e) => {
        e.preventDefault();
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store
        let name = "";
        let deliver = this.state.deliverdata.filter(deliverdata => deliverdata._id === this.state.deliverid).map((item) => {
            return (name = item.name);
        });
        const apiUrl = `${this.state.apiurl}/orders/update-delivery-status`;
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                status: this.state.statuschange,
                id: this.state.upid,
                deliveryStaff: {
                    name: name,
                    id: this.state.deliverid
                }
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
        }
        alert(data.message);
        this.getData();
    }
    deliveryChange = e => {
        this.setState({
            ...this.state, [e.target.name]: e.target.value
        })
    }
    Adddelivery = () => {
        return (
            <>
                {this.state.val ? (
                    <Modal>
                        <ModalHeader><Modaltitle>Add Deliver</Modaltitle>
                            <Modalclose onClick={() => { this.setState({ val: false }) }}>X</Modalclose></ModalHeader>
                        <ModalBody>
                            <form className="form" onSubmit={this.handelSubmit}>
                                <div className="form-inputs">
                                    <label htmlFor="  deliverid" className='from-label'>Delivery Personal:</label>
                                    <select name="deliverid" id="deliverid" className="form-input"
                                        onChange={this.deliveryChange}
                                    ><option value='null'>--Add delivery personal-- </option>
                                        {this.state.deliverdata.map((item, index) => {
                                            return (<option value={item._id}>{item.name} </option>);
                                        })}
                                    </select>
                                </div>
                                <div className="form-inputs">
                                    <label htmlFor="statuschange" className='from-label'>Delivery Personal:</label>
                                    <select name="statuschange" id="statuschange" className="form-input"
                                        onChange={this.deliveryChange}
                                    > <option >--Change Status-- </option>
                                        <option value='pending'>Pending</option>
                                        <option value='complete'>Complete</option>
                                    </select>
                                </div>
                                <Modalfooter type='submit' >Add</Modalfooter>
                            </form>
                        </ModalBody>
                    </Modal>
                ) : ''}
            </>
        )
    }
    render() {
        return (
            <><div style={{ marginTop: 80.0 }}><Card>
                <Head>
                    <div id='title'>
                        Orders Placed
               </div>
                </Head>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TableContainer  >
                        <Table >
                            <TableHead height="5" style={{ background: '#bdc3c7', height: 5 }}>
                                <TableRow >
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        S.N
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Customer Name
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Address
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        item
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Status
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Amount
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Toatal Quantity
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Add delivery
                               </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {this.state.data.map((item, index) => {
                                    return (
                                        <TableRow key={item.id} >
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center" >
                                                {item.customer.name}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                {item.address}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                {item.item.map((item, i) => {
                                                    return (<p key={item.name}>{item.name}</p>)
                                                })}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                {item.status}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                Rs: {item.totalAmount}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                {item.totalQuantity}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16 }} align="center" width='10%'>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Btn style={{ background: 'blue', width: '100%' }} value={item.id}
                                                        onClick={() => this.upda(item._id)}
                                                    > Add</Btn></div>
                                            </TableCell>
                                        </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
            </div>
                <div >
                    {this.Adddelivery()}
                </div>
                <div></div>
            </>
        );
    };
};
export default Order;
import React, { Component } from 'react';
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from '@material-ui/core';
import './Form.css';
import {
    Card,
    Head,
} from './support/Homedeliver.element';
export class HomeDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: this.props.value,
            val: false,
            up: false,
            upid: '',
            values: {
                id: '',
                name: '',
                details: '',
                price: ''
            },
            apiurl: process.env.REACT_APP_SERVER_URL
        };
        this.getData = this.getData.bind(this);
    }
    closeModelHandeler = () => this.setState({ val: false });
    componentDidMount() {
        this.getData();
    }
    componentWillUnmount() {
        this.getData();
    }
    componentDidUpdateMount() {
        this.getData();
    }
    getData = async () => {
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
        this.setState({ data: data });
    }
    render() {
        return (
            <><div>
                <Card>
                    <Head> <div id='title'>Home Delivery Personal info </div>
                    </Head>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TableContainer style={{ border: '1px solid black', padding: 5 }} >
                            <Table border='2px solid white' style={{ border: '2px solid white' }} >
                                <TableHead style={{ background: '#2980b9', border: '2px solid white' }}>
                                    <TableRow >
                                        <TableCell align="center" style={{ color: 'white', fontSize: 18 }}>
                                            S.N
                               </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontSize: 18 }}>
                                            Delivery Personal
                               </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontSize: 18 }}>
                                            Contact
                               </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontSize: 18 }}>
                                            Total delivery
                               </TableCell> </TableRow></TableHead>
                                <TableBody style={{ background: '#bdc3c7' }}>
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <TableRow key={item.id} >
                                                <TableCell style={{ fontSize: 18 }} align="center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell style={{ fontSize: 18 }} align="center" >
                                                    {item.name}
                                                </TableCell>
                                                <TableCell style={{ fontSize: 18 }} width="30%" align="center">
                                                    {item.mobile}
                                                </TableCell>
                                                <TableCell style={{ fontSize: 18 }} width="30%" align="center">
                                                    {item.totalDelivery}
                                                </TableCell></TableRow>);
                                    })}
                                </TableBody></Table></TableContainer></div></Card></div> </>
        );
    };
};
export default HomeDelivery;
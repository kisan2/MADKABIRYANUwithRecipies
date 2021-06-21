import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react';
import { Parag, Para, Tablediv, Header } from './OrderRecipt.element';

export class Pritnting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            apiurl: process.env.REACT_APP_SERVER_URL

        }
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData()

    }
    componentWillUnmount() {
        this.getData()

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
        this.setState({
            items: [...this.state.items, ...data]

        });
    }
    render() {
        //const length=this.location.props.state.length;

        const oderData = this.props.data != undefined ? this.props.data : null;
        let html;
        if (oderData) {
            html = <div >
                <Parag>

                    -----------------Order Recipt--------------------
                    {
                        this.state.items.filter(items => items._id === oderData).map((item) => {
                            return (
                                <>

                                    <Header>
                                        <div >Order Recipt By:</div>
                                        <div>Customer Name:{this.props.item.customer.name}</div>
                                        <div>HD No:{this.props.data}</div>
                                        <div>KOT ID:{this.props.data}</div>
                                        <div>Date:{new Date().toLocaleString()}</div>
                                    </Header>

                ------------------------------------------------

               <Tablediv>
                                        <TableContainer style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow style={{ fontWeight: 900, fontStyle: 'bold' }}>
                                                        <TableCell style={{ fontWeight: 900, fontStyle: 'bold' }}>
                                                            Product Name:
                            </TableCell>
                                                        <TableCell style={{ fontWeight: 900, fontStyle: 'bold' }}>
                                                            Quantity
                            </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {item.item.map((el) => {
                                                        return (
                                                            <TableRow style={{ height: 4 }}>
                                                                <TableCell style={{ fontSize: 16, fontWeight: 600, fontStyle: 'bold' }} >{el.name}</TableCell>
                                                                <TableCell style={{ fontSize: 16, fontWeight: 600, fontStyle: 'bold' }} >{el.quantity}</TableCell>
                                                            </TableRow>

                                                        );

                                                    })}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Tablediv>
                                </>


                            )

                        })
                    }



                -------------------------------------------------
                <Para style={{ textAlign: 'left' }}>Remark:</Para>

                    <h5>Order Verified By</h5>
                </Parag>


            </div>

        }
        else {
            html = <>
                sorry failed
                <p>{oderData}</p>
            </>;
        }

        return html;
    }
}

export default Pritnting;
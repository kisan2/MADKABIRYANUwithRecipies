import React, { Component } from 'react';
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from '@material-ui/core';
import './Form.css';
import {

    Card,
    Head,
    Btn
} from './support/Products.elements';
import {
    ModalBody,
    Print,
    Links
} from "./support/Pos.element";
import ReactToPrint from "react-to-print";
import OrderRecipt from "./OrderRecipt";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";


export class Booked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            token: '',
            print: false,
            dataid: "",
            apiurl: process.env.REACT_APP_SERVER_URL
        }
        this.getData = this.getData.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentDidMount() {
        this.getData();
    }
    componentWillUnmount() {
        this.getData();
    }
    componentDidUpdateMount() {
        this.getData();
    }
    closeModelHandeler = () => this.setState({ val: false });
    getData = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/booking`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        console.log(data)
        this.setState({
            value: data
        });
    }
    handelSubmit = async (id) => {
        // e.preventDefault();
        let value = JSON.parse(localStorage.getItem("login"));
        this.setState({ disabled: true });
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/kot`;
        const cus = this.state.value.find(
            value => value._id === id
        );

        const response = await fetch(apiUrl, {
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({
                customer: cus.customer,
                amount: cus.totalAmount,
                quantity: cus.totalQuantity,
                items: cus.item,
                bookingId: cus._id
            }),
        });
        const { data, message } = await response.json();
        this.setState({ dataid: data._id });

        if (response.status === 200) {
            this.setState({ print: true });
            this.setState({ dataid: data._id });
            this.print();
        } else {
            alert(message);
        }
    }
    print = data => {
        let html;
        this.state.print
            ? (html = (
                <Print>
                    <ModalBody
                        style={{
                            display: "flex",
                            marginTop: 400,
                            flexDirection: "column",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <div>OT has been added.</div>
                        <div>
                            <ReactToPrint
                                trigger={() => (
                                    <Links
                                        to={{
                                            pathname: "/sales",
                                            state: {
                                                data: this.state.dataid,
                                                isPaid: false,
                                            },
                                        }}
                                        style={{ textDecoration: "none" }}>
                                        <ArrowForwardIcon /> Print OT And Go To Sales
                                    </Links>
                                )}
                                content={() => this.componentRef}
                            />
                        </div>
                        <div style={{ display: "none", border: "1px solid black" }}>
                            <OrderRecipt
                                data={this.state.dataid}
                                ref={el => (this.componentRef = el)}
                            />
                        </div>
                    </ModalBody>
                </Print>
            ))
            : (html = "");

        return html;
    };

    render() {
        return (
            <>   <Card>
                <Head>
                    <div id='title'> Boooked Orders </div>
                </Head>
                <div>
                    <TableContainer >
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
                                        ordered Item
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Total Quanity
                                    </TableCell>

                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Total Amount
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Time
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.value.map((item, index) => {
                                    // console.log(item);
                                    // const price = item.category === 'beverage and drink' ? item.salesPrice : item.cost;
                                    // const imagePath = `${process.env.REACT_APP_SERVER_URL}/${item.image}`;
                                    return (
                                        <TableRow key={index} >
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
                                                {item.customer.name}
                                            </TableCell>
                                            <TableCell width="30%" style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
                                                {
                                                    item.item.map((evl, i) => (
                                                        <p key={evl.id}>{i + 1}.
                                                            {"  "}{evl.name}{"  "} ({evl.quantity})</p>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell width='2%' style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {item.totalQuantity}
                                            </TableCell>
                                            {/* <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {item.brand}
                                            </TableCell> */}

                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                Rs: {item.totalAmount}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {item.time}
                                            </TableCell>
                                            <TableCell width="15%" style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                <Btn style={{ background: '#3498db' }}
                                                    onClick={() => this.handelSubmit(item._id)}
                                                    value={item._id}> Add To Kot</Btn>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
                <div>
                    {this.print()}
                </div>
                <div>
                </div> </>
        );
    };
};
export default Booked;
import React, { Component } from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core';
import { Person, ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import OrderRecipt from './OrderRecipt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
    PosWrapper,
    PosItemcontainer,
    PosCalculation,
    PosItemFilter,
    PosItemContent,
    Paymentdetail,
    Paymentrec,
    PaymentBtn,
    Select,
    Filterdata, Filteritemval, Form, FormInputsBtns,
    Print, Links,
    Card, ModalBody,
    Button,
    FormInputs,
    ModuleCont,
    Posrec,
    Cards
} from './support/Pos.element';

export class Updatepos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [], item: [],
            customer: [],
            customerorder: [],
            oders: {
                id: '',
                name: '',
                stock: '',
                quantity: 1,
                total: '',
                price: '',
                category: ''
            },
            discount: '',
            type: '',
            totalquantity: 0,
            totalprice: 0,
            totaldisc: 100,
            grandTotal: 0, print: false,
            up: false,
            pay: false, disable: false,
            dis: false,
            upid: '',
            itemcl: 0,
            customername: [],
            sliceS: 0,
            sliceE: 9,
            tableOnData: [],
            paymenttype: '',
            partialamount: '',
            name: '',
            address: '', kotid: '',
            phone: '',
            filteroption: 'all',
            customer_name: 'all',
            ordereddata: '',
            customeraddress: '', customercontact: '', itemfiltered: '',
            apiurl: process.env.REACT_APP_SERVER_URL
        }

        this.getData = this.getData.bind(this);
        this.paysubmit = this.paysubmit.bind(this);
        this.getItems = this.getItems.bind(this);
        //    this.getcategory=this.getcategory.bind(this);

    }

    componentDidMount() {
        this.getData();
        this.getItems();
        this.getcategory();
    }
    paysubmit = async (e) => {
        e.preventDefault();
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        let Grand = 0;
        Grand = Number(this.totalamount());
        let quantity = 0;
        quantity = Number(this.totalquantity());
        const item = this.state.item.find(item => item._id === this.props.location.state.data);
        const apiUrl = `${this.state.apiurl}/kot`;
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "customer": {
                    "name": item.customer.name,
                    "id": item.customer.id,
                    "address": item.customer.address,
                    "phoneNo": item.customer.phoneNo

                },
                "hdNo": item.hdNo,
                "invoiceNo": item.invoiceNo,
                "amount": Grand,
                "quantity": quantity,
                "items": this.state.customerorder,
                "id": item._id,
               
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
        }
        else {
            this.setState({ print: true });
            this.setState({ dataid: this.props.location.state.data });
            this.print();
        }
    }
    print = () => {
        let html;
        this.state.print ? html = <Print>
            <ModalBody style={{
                display: 'flex',
                marginTop: 400,
                flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'
            }}>
                <div>OT has been added.</div>
                <div>
                    <ReactToPrint trigger={() => <Links to={{
                        pathname: '/sales',
                        state: {
                            data: this.state.dataid,
                            isPaid: false,
                            //length:this.state.item.length
                        }
                    }}
                        style={{ textDecoration: 'none' }}
                    ><ArrowForwardIcon /> Print OT And Go To Sales</Links>}
                        content={() => this.componentRef} />
                </div>
                <div style={{ display: 'none', border: '1px solid black' }}>
                    <OrderRecipt data={this.state.dataid} ref={el => (this.componentRef = el)} /></div>


            </ModalBody>
        </Print> : html = '';

        return html;
    }
    handelCustomer = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    getData = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/kot`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        this.setState({
            item: [...this.state.item, ...data]

        });
    }
    getItems = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/recepies?device=1`;
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
    getcategory = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/categories?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(items => items.json());
        this.setState({ customer: [...this.state.customer, ...data] });
    }
    handelIncreament = (id) => {
        const elementsIndex = this.state.customerorder.findIndex(
            customerorder => customerorder.id === id
        );
        let newArray = [...this.state.customerorder];

        newArray[elementsIndex] = {
            ...newArray[elementsIndex],
            quantity: newArray[elementsIndex].quantity + 1,
        };
        newArray[elementsIndex] = {
            ...newArray[elementsIndex],
            total: newArray[elementsIndex].quantity * newArray[elementsIndex].price,
        };
        this.setState({ customerorder: newArray });



    }
    handelDecreament = (id) => {
        const elementsIndex = this.state.customerorder.findIndex(customerorder => customerorder.id === id);
        let newArray = [...this.state.customerorder];
        newArray[elementsIndex] = { ...newArray[elementsIndex], quantity: newArray[elementsIndex].quantity > 1 ? newArray[elementsIndex].quantity - 1 : 1 };
        newArray[elementsIndex] = { ...newArray[elementsIndex], total: newArray[elementsIndex].quantity * newArray[elementsIndex].price };
        this.setState({ customerorder: newArray, });
    }
    discountchanger = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            ...this.state,
            [name]: value,
        }, () => {
            this.GrandTotal();

        });

    }
    OnCustomeritem = id => {
        if (this.state.tableOnData.indexOf(id) === -1) {
            this.state.items
                .filter(items => items._id === id)
                .map((item, index) => {

                    this.setState(
                        {
                            oders: {
                                id: item._id,
                                name: item.name,
                                cost: item.cost,
                                ingredients: item.ingredients,
                                ingredientAmount: item.ingredientAmount,
                                stock: item.category === 'beverage and drink' ? item.openingStock : item.quantity,
                                price: item.category === 'beverage and drink' ? item.salesPrice : item.cost,
                                quantity: 1,
                                profitMargin: item.profitMargin,
                                total: item.category === 'beverage and drink' ? item.salesPrice : item.cost,
                                category: item.category,
                            },
                        },
                        () => {
                            this.setState({
                                customerorder: [...this.state.customerorder, this.state.oders],
                            });
                        }
                    );
                });
            // this.state.tableOnData.push(id);
            this.setState({ tableOnData: [...this.state.tableOnData, id] });
        } else {
            const elementsIndex = this.state.customerorder.findIndex(
                customerorder => customerorder.id === id
            );
            let newArray = [...this.state.customerorder];
            console.log(newArray[elementsIndex].stock)

            newArray[elementsIndex] = {
                ...newArray[elementsIndex],
                quantity: newArray[elementsIndex].quantity + 1,
            };
            newArray[elementsIndex] = {
                ...newArray[elementsIndex],
                total: newArray[elementsIndex].quantity * newArray[elementsIndex].price,
            };
            this.setState({ customerorder: newArray });

        }
    };

    deleteItem = (id) => {
        const item = this.state.customerorder;

        const elementsIndex = this.state.customerorder.findIndex(
            customerorder => customerorder.id === id
        );
        let newArray = [...this.state.customerorder];
        let newTableOnData = [...this.state.tableOnData];
        newTableOnData.splice(elementsIndex, 1)
        newArray.splice(elementsIndex, 1);
        this.setState({ customerorder: newArray });

        this.setState({ tableOnData: newTableOnData });
        // console.log(newArray)



    }
    tablebody = () => {
        return (
            <>
                {this.state.customerorder.map((item, index) => {
                    return (<TableRow >
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.name}</TableCell>
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.stock}</TableCell>
                        <TableCell style={{ fontSize: 18 }} align='center' >
                            <button id='stock' onClick={() => this.handelDecreament(item.id)}>-</button>
                            <input id='stoc' type='text'
                                value={item.quantity}
                                onchange={() => this.handelDecreament(item.id)} />
                            <button id='stock' onClick={() => this.handelIncreament(item.id)}>+</button>
                        </TableCell>
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.price}</TableCell>
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.total}</TableCell>
                        <TableCell  >
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: 'red',
                                textAlign: 'center',
                                padding: '4px',
                                color: 'white',
                                borderRadius: '10px',
                                fontSize: '15px'
                            }} onClick={() => this.deleteItem(item.id)}>Delete</div>

                        </TableCell>
                    </TableRow>
                    );
                })}
            </>
        );
    }

    totalamount = () => {
        let total = this.state.totalprice;
        this.state.customerorder.map((item, index) => {
            total = total + item.total;
        });

        return total;
    }
    totalquantity = () => {
        let total = this.state.totalquantity;
        this.state.customerorder.map((item, index) => {
            total = total + item.quantity;
        });
        return total;
    }


    handelOnchange = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    }
    filter = (options) => {
        return options.filter(
            option => option['name'].toLowerCase().indexOf(this.state.itemfiltered.toLowerCase()) > -1)
    }

    items = () => {
        return (
            <>
                {this.state.filteroption === 'all' ?
                    (this.filter(this.state.items).map((item, index) => {
                        return (

                            <Card key={index} onClick={() => this.OnCustomeritem(item._id)} >
                                <p>{item.name}</p>
                            </Card>
                        );

                    })) :
                    (this.filter(this.state.items).filter(items => items.category === this.state.filteroption).slice(this.state.sliceS, this.state.sliceE).map((item, index) => {
                        return (<Card key={index} onClick={() => this.OnCustomeritem(item._id)} > {item.name}</Card>
                        );

                    }))
                }
            </>
        );

    }
    render() {
        const oderData = this.props.location.state != undefined ? this.props.location.state.data : null;
        let html;

        if (oderData) {

            html = <div style={{ marginTop: 80 }}>
                <PosWrapper>

                    {
                        this.state.item.filter(item => item._id === oderData).map((item) => {

                            return (
                                <PosCalculation>
                                    <p id='title'  > <ShoppingCart id='titl' /> Order Invoice</p>
                                    <PosItemFilter>
                                        <Filterdata>
                                            <Person style={{
                                                border: '1px solid black',
                                                background: 'white',
                                                justifyContent: 'center', height: 40, margin: 0
                                            }} />
                                            <Form onSubmit={this.handelCustomerSubmit}>
                                                <Select style={{ fontSize: 16 }} type='text' placeholder="customername"
                                                    name='customer_name'
                                                    id='customer_name'
                                                >
                                                    <option value={item.customer.name} >{item.customer.name}</option>
                                                </Select>
                                                <Filteritemval style={{ fontSize: 16 }}
                                                    onChange={this.handelCustomer}
                                                    name='customeraddress'
                                                    value={item.customer.address}

                                                    type='text' />
                                                <Filteritemval
                                                    style={{ fontSize: 16 }} name="customercontact"
                                                    value={item.customer.phoneNo}
                                                    onChange={this.handelCustomer}
                                                    type='text' />

                                            </Form>
                                        </Filterdata>
                                    </PosItemFilter>
                                    <PosItemContent>
                                        <TableContainer height="400px">
                                            <Table border='1px solid white' style={{ border: '2px solid white' }}
                                            >
                                                <TableHead style={{ background: '#3498db', height: 10, border: '2px solid white' }}>
                                                    <TableRow style={{ height: 4 }}>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Item Name</TableCell>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Stock</TableCell>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Quantity</TableCell>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Price inc.Tax</TableCell>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Total</TableCell>
                                                        <TableCell width='10%'
                                                            style={{ color: "white", fontSize: 16 }}
                                                            align='center'>
                                                            Remove
                        </TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody >
                                                    {item.item.map((el) => {
                                                        return (
                                                            <TableRow style={{ height: 4 }}>
                                                                <TableCell style={{ fontSize: 16 }} align='center'>{el.name}</TableCell>
                                                                <TableCell style={{ fontSize: 16 }} align='center'>{el.stock}</TableCell>
                                                                <TableCell style={{ fontSize: 16 }} align='center'>{el.quantity}</TableCell>
                                                                <TableCell style={{ fontSize: 16 }} align='center'>{el.price}</TableCell>
                                                                <TableCell style={{ fontSize: 16 }} align='center'>{el.total}</TableCell>

                                                            </TableRow>

                                                        );

                                                    })}
                                                    {this.tablebody()}
                                                </TableBody></Table></TableContainer>
                                    </PosItemContent>

                                    <Paymentdetail >
                                        <Paymentrec>

                                            <form className='form' onSubmit={this.paysubmit}>
                                                <Posrec>


                                                    <FormInputs
                                                        style={{ fontWeight: 600, fontStyle: 'bold', fontFamily: 'Arial' }}

                                                    > Items: <label style={{ marginLeft: 10 }}>
                                                            {this.totalquantity()}</label></FormInputs>
                                                    <FormInputs style={{ fontWeight: 600, fontStyle: 'bold', fontFamily: 'Arial' }} > Total Amount:  <label style={{ marginLeft: 10 }}>
                                                        Rs{this.totalamount()}</label></FormInputs></Posrec>

                                                <FormInputsBtns><Link to='/'><PaymentBtn >DashBoard</PaymentBtn></Link>
                                                    <PaymentBtn style={{ background: 'green' }} type='submit'
                                                    ><ShoppingCart />  Update Order Now</PaymentBtn>
                                                </FormInputsBtns>
                                            </form>   </Paymentrec>
                                    </Paymentdetail>
                                </PosCalculation>
                            );
                        })
                    }
                    <PosItemcontainer>
                        <PosItemFilter style={{ borderTop: 'none' }}>
                            <Filterdata>
                                <Person style={{
                                    borderTop: '1px solid black', borderBottom: '1px solid black', alignItems: 'center',
                                    borderLeft: '1px solid black',
                                    background: 'white',
                                    justifyContent: 'center', height: 40, margin: 0
                                }} />
                                <Select onChange={this.handelOnchange} style={{ fontSize: 18 }} name="filteroption"
                                >
                                    <optgroup style={{ fontSize: 18 }} label="ALL Category">
                                        <option style={{ fontSize: 18 }} value="all">All category</option>
                                        {this.state.customer.map((item) => {
                                            return (
                                                <option style={{ fontSize: 18 }} key={item._id} value={item.category} >
                                                    {item.category}</option>
                                            );
                                        })}</optgroup></Select>
                            </Filterdata>
                            <Filterdata>
                                <Filteritemval style={{ fontSize: 18 }} type='text'
                                    name='itemfiltered' placeholder='All items'
                                    onChange={this.handelCustomer}
                                />
                                <Button>All</Button></Filterdata>
                        </PosItemFilter>
                        <ModuleCont className="scrollbar">{this.items()}</ModuleCont>
                    </PosItemcontainer>
                </PosWrapper>
                {this.print()}
            </div>
        } else {
            html = "page not found.....!"
        }
        return html;
    }
}

export default Updatepos;

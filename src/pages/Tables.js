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
    Modalfooter, FormInputsBtn,
    Card,
    Head,
    Btn
} from './support/Tables.element';
export class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            brand: '',
            unit: '',
            price: '',
            alert: '',
            opening: '',
            count: 'this.props.value',
            val: false,
            up: false, disabled: false,
            upid: '',
            value: [],
            items: [],
            brands: [],
            token: '',
            apiurl: process.env.REACT_APP_SERVER_URL
        }
        this.getData = this.getData.bind(this);
        this.getBrand = this.getBrand.bind(this);
        this.getcategory = this.getcategory.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
        this.handelUpdate = this.handelUpdate.bind(this);
        this.upda = this.upda.bind(this);
        this.handelAdd = this.handelAdd.bind(this);
        this.AddNew = this.AddNew.bind(this);
        this.funUpdate = this.funUpdate.bind(this);

    }

    componentDidMount() {
        this.getData();
        this.getcategory();
        this.getBrand();
    }
    componentWillUnmount() {
        this.getData();
        this.getcategory();
        this.getBrand();

    }
    componentDidUpdateMount() {
        this.getData();
        this.getcategory();
        this.getBrand();

    }
    closeModelHandeler = () => this.setState({ val: false });

    getBrand = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/brands?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        this.setState({ brands: data });
        this.setState({ val: false, up: false });

    }

    getData = async () => {

        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/items?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());

        this.setState({
            value: data, up: false
        });
        this.setState({
            name: '',
            category: '',
            brand: '',
            unit: '',
            price: '',
            alert: '',
            opening: ''
        })

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
        this.setState({
            items: data
        });
    }
    handelIncrement = e => {
        this.props.value = 1;
        this.setState({ count: this.state.count + 1 })
    };
    handelDelete = async (item) => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/delete-item/${item}?device=1`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        });

        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
        }
        alert(data.message);
        this.getData();
    };
    handelAdd = () => {
        this.setState({ val: !this.state.val });
    };
    upda = async (id) => {
        this.setState({ upid: id })
        this.setState({ up: true });
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/update-item/${id}?device=1`;
        const data = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
    }
    handelUpdate = async (e) => {
        e.preventDefault();
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/update-item`;
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "product_name": this.state.name,
                "product_category": this.state.category,
                "product_brand": this.state.brand,
                "product_opening_stock": this.state.opening,
                "product_alert_quantity_stock": this.state.alert,
                "product_unit": this.state.unit,
                "product_price": this.state.price,
                "product_profit_margin": this.state.price,
                "totalAmount": this.state.price,
                "id": this.state.upid
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
        }
        alert(data.message);
        this.getData();
    }
    handelChange = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    }
    handelSubmit = async (e) => {
        e.preventDefault();
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/add-item`;
        const response = await fetch(apiUrl, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "product_name": this.state.name,
                "product_category": this.state.category,
                "product_brand": this.state.brand,
                "product_opening_stock": this.state.opening,
                "product_alert_quantity_stock": this.state.alert,
                "product_unit": this.state.unit,
                "product_price": this.state.price,
                "product_profit_margin": this.state.price,
                "totalAmount": this.state.price
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
        }
        alert(data.message);
        this.getData();
    }
    AddNew = () => {
        return (
            <>
                {this.state.val ? (
                    <div style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Modal >
                            <ModalHeader>
                                <Modaltitle>Add New Table</Modaltitle>
                                <Modalclose onClick={() => this.closeModelHandeler()}>Back</Modalclose>
                            </ModalHeader>
                            <Modalcontent>
                                <ModalBody>
                                    <form className='form' onSubmit={this.handelSubmit}>
                                        <div className="form-inputs">
                                            <label htmlFor="name" className="form-label"> Table Name:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 5 }}
                                                id='name'
                                                name="name"
                                                placeholder="Table name......"
                                                className="form-input"
                                                value={this.state.name}
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="category" className="form-label"> Store:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 60 }}
                                                id='category'
                                                name="category"
                                                placeholder="Store......"
                                                className="form-input"
                                                value={this.state.category}
                                                onChange={this.handelChange}
                                            />
                                        </div>

                                        <div className="form-inputs">
                                            <label htmlFor="brand" className="form-label"> Capacity:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 35 }}
                                                id='brand'
                                                name="brand"
                                                placeholder="Capacity......"
                                                className="form-input"
                                                value={this.state.brand}
                                                onChange={this.handelChange}
                                            />

                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="unit" className="form-label"> Avilable:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 35 }}
                                                id='unit'
                                                name="unit"
                                                placeholder="Avilable......"
                                                className="form-input"
                                                value={this.state.unit}
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="price" className="form-label"> Status:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 50 }}
                                                id='price'
                                                value={this.state.price}
                                                name="price"
                                                placeholder="Status....."
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>

                                        <FormInputsBtn><Modalfooter disabled={this.state.disabled} type='submit' >Add Table</Modalfooter> </FormInputsBtn>
                                    </form>
                                </ModalBody>
                            </Modalcontent>
                        </Modal></div>) : ''}
            </>
        );
    }
    funUpdate = () => {
        return (
            <>
                {this.state.up ? (
                    <div style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    > <Modal >
                            <ModalHeader>
                                <Modaltitle>Edit Data</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ up: false }) }}>X</Modalclose>
                            </ModalHeader>
                            {this.state.value.filter(value => value._id === this.state.upid).map((item, index) => {
                                return (
                                    <Modalcontent>
                                        <ModalBody>
                                            <form className='form' onSubmit={this.handelUpdate}>
                                                <div className="form-inputs">
                                                    <label htmlFor="name" className="form-label"> Name:
                </label>
                                                    <input type="text"
                                                        style={{ marginLeft: 65 }}
                                                        id='name'
                                                        name="name"
                                                        placeholder="Product name......"
                                                        className="form-input"
                                                        defaultValue={item.name}
                                                        FinalValue={this.state.name}
                                                        onChange={this.handelChange}
                                                    />
                                                </div>
                                                <div className="form-inputs">
                                                    <label htmlFor="category" className="form-label"> Category:
                </label>
                                                    <select
                                                        style={{ marginLeft: 35 }}
                                                        id='category'
                                                        name="category"
                                                        FinalValue={this.state.category}
                                                        defaultValue={item.category}
                                                        className="form-input"
                                                        onChange={this.handelChange}
                                                    ><option value='All'>All Category</option>
                                                        {this.state.items.map((item, index) => {
                                                            return (
                                                                <option value={item.category}>{item.category}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-inputs">
                                                    <label htmlFor="brand" className="form-label"> Brand:
                </label>
                                                    <select
                                                        style={{ marginLeft: 65 }}
                                                        id='brand'
                                                        name="brand"
                                                        defaultValue={item.brand}
                                                        FinalValue={this.state.brand}
                                                        className="form-input"
                                                        onChange={this.handelChange}
                                                    > <option value='All'>All Brands</option>
                                                        <option value='food material'>Food  material</option>
                                                    </select>
                                                </div>

                                                <div className="form-inputs">
                                                    <label htmlFor="unit" className="form-label"> Unit:
                </label>
                                                    <select
                                                        style={{ marginLeft: 84 }}
                                                        id='unit'
                                                        defaultValue={item.unit}
                                                        FinalValue={this.state.unit}
                                                        name="unit"
                                                        className="form-input"
                                                        onChange={this.handelChange}
                                                    > <option value="All">All</option>
                                                        <option value="kg">Kg</option>
                                                        <option value="gram">gram</option>
                                                        <option value="liter">liter</option>
                                                    </select>
                                                </div>
                                                <div className="form-inputs">
                                                    <label htmlFor="price" className="form-label"> Price:
                </label>
                                                    <input type="text"
                                                        style={{ marginLeft: 79 }}
                                                        id='price'
                                                        name="price"
                                                        defaultValue={item.salesPrice}
                                                        FinalValue={this.state.price}
                                                        placeholder="Price....."
                                                        className="form-input"
                                                        onChange={this.handelChange}
                                                    />
                                                </div>
                                                <div className="form-inputs">
                                                    <label htmlFor="alert" className="form-label">Alert Quantity:
                </label>
                                                    <input type="text"
                                                        style={{ marginLeft: 5 }}
                                                        id='alert'
                                                        name="alert"
                                                        placeholder="Alert Quantity....."
                                                        className="form-input"
                                                        defaultValue={item.alertQuantity}
                                                        FinalValue={this.alert}
                                                        onChange={this.handelChange}
                                                    />
                                                </div>
                                                <div className="form-inputs">
                                                    <label htmlFor="opening" className="form-label">Opening stock:
                </label>
                                                    <input type="text"
                                                        style={{ marginLeft: 0 }}
                                                        id='opening'
                                                        name="opening"
                                                        defaultValue={item.openingStock}
                                                        FinalValue={this.state.opening}
                                                        placeholder="Current Opening stock ....."
                                                        className="form-input"
                                                        onChange={this.handelChange}
                                                    />
                                                </div>
                                                <Modalfooter type='submit' >Update</Modalfooter>
                                            </form>
                                        </ModalBody>
                                    </Modalcontent>
                                );
                            }
                            )}
                        </Modal></div>) : ''}
            </>
        );
    }
    render() {
        return (
            <>
                <div style={{
                    fontSize: '24px',
                    color: 'lightgrey',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'capitalize',
                    paddingTop: '300px'
                }}>
                    Under Maintanance ........
            </div>

            </>

            //   <Card>
            //     <Head>
            //         <div id='title'> Table </div>
            //         <Btn id='newuser' style={{ backgroundImage: 'linear-gradient(to bottom,#6190E8 ,#A7BFE8)' }}
            //             onClick={this.handelAdd}
            //         > New Table
            //    </Btn>
            //     </Head>
            //     <div>
            //         <TableContainer >
            //             <Table  >
            //                 <TableHead height="5" style={{ background: '#bdc3c7', height: 5 }}>
            //                     <TableRow >
            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             S.N
            //                    </TableCell>
            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             Table Name
            //                    </TableCell>
            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             Store
            //                    </TableCell>


            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             Capacity
            //                    </TableCell>
            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             Avilable
            //                    </TableCell>
            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             status
            //                    </TableCell>

            //                         <TableCell align="center" style={{ fontSize: 16 }}>
            //                             Action
            //                    </TableCell>
            //                     </TableRow>
            //                 </TableHead>
            //                 <TableBody>
            //                     {this.state.value.map((item, index) => {

            //                         return (
            //                             <TableRow key={index} >
            //                                 <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
            //                                     {index + 1}
            //                                 </TableCell>
            //                                 <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
            //                                     {item.name}
            //                                 </TableCell>
            //                                 <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
            //                                     {item.store}
            //                                 </TableCell>
            //                                 <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
            //                                     {item.capacity}
            //                                 </TableCell>
            //                                 <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
            //                                     {item.avilable}
            //                                 </TableCell>
            //                                 <TableCell style={{ fontSize: 18, textTransform: 'capitalize' }} align="center">
            //                                     {item.status}
            //                                 </TableCell>
            //                                 <TableCell width="5%" style={{ fontSize: 16, alignItems: 'center', justifyContent: 'center' }} align="center">
            //                                     <div style={{ display: 'flex', flexDirection: 'row' }}>
            //                                         <Btn style={{ background: 'red' }} value={item.id}
            //                                             onClick={() => this.handelDelete(item._id)}
            //                                         >Delete</Btn>
            //                                         <Btn style={{ background: '#3498db' }} value={item.id}
            //                                             onClick={() => this.upda(item._id)}
            //                                         >Modify</Btn></div>
            //                                 </TableCell>
            //                             </TableRow>
            //                         );
            //                     })}
            //                 </TableBody>
            //             </Table>
            //         </TableContainer>
            //     </div>
            // </Card>
            //     <div>
            //         {this.AddNew()}
            //         {this.funUpdate()}
            //     </div>
            //     <div>
            //     </div> 

        );
    };
};
export default Tables;
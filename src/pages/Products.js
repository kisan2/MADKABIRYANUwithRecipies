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
    // Btn
} from './support/Products.elements';
export class Products extends Component {
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
            up: false,
            units: false,
            unitname: '',
            unitdetail: '',
            disable: false,
            upid: '',
            value: [],
            items: [],
            brands: [],
            unit: '',
            token: '',
            apiurl: process.env.REACT_APP_SERVER_URL
        }
        this.getData = this.getData.bind(this);
        // this.getBeverage = this.getBeverage.bind(this);
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
        this.handelUnit = this.handelUnit.bind(this);

    }

    componentDidMount() {
        this.getData();
        this.getcategory();
        this.getBrand();
        // this.getBeverage();
        this.units();
    }
    componentWillUnmount() {
        this.getData();
        this.getcategory();
        // this.getBeverage();
        this.getBrand();

    }
    componentDidUpdateMount() {
        this.getData();
        this.getcategory();
        // this.getBeverage();
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
        const apiUrl = `${this.state.apiurl}/recepies?device=1`;
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
    // getBeverage = async () => {
    //     let value = JSON.parse(localStorage.getItem('login'));
    //     this.setState({ token: value.store });
    //     let token = value.store;
    //     const apiUrl = `${this.state.apiurl}/recepies?device=1`;
    //     const { data } = await fetch(apiUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `${token}`
    //         }
    //     }).then(values => values.json());

    //     this.setState({
    //         value: [...this.state.value, data]
    //     });

    // }
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
        this.setState({ disable: true });
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
                // "expiry_date":"",
                "product_unit": this.state.unit,
                "product_price": this.state.price,
                "product_profit_margin": this.state.price,
                // "tax":"",
                // "sales_tax":"",
                "totalAmount": this.state.price,
                "id": this.state.upid
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
            this.setState({ disable: false });
        } else {
            alert(data.message);
            this.setState({ disable: false });
            this.getData();
        }

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
        this.setState({ disable: true });
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
                // "expiry_date":"",
                "product_unit": this.state.unit,
                "product_price": this.state.price,
                "product_profit_margin": this.state.price,
                // "tax":"",
                // "sales_tax":"",
                "device": 1,
                "totalAmount": this.state.price
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
            this.setState({ disable: false });
        } else {
            this.setState({ disable: false });
            alert(data.message);
            this.getData();

        }

    }
    handelUnit = (e) => {
        e.preventDefault();
        this.setState({ disabled: true });
        if (this.state.unitname === '') {
            alert('please enter unit ');
            this.setState({ unitname: '', unitdetail: '', disabled: false });
        } else {
            if (localStorage.getItem('units') !== null) {
                const unit = JSON.parse(localStorage.getItem('units'));
                let units = unit.units;
                let obj = [];
                obj = units;
                const data = this.state.unitname;
                obj.push(data);
                localStorage.setItem("units", JSON.stringify({
                    units: obj
                }));
                this.setState({ unitname: '', unitdetail: '', disabled: false });
            } else {
                let obj = [];
                const data = this.state.unitname;
                obj.push(data);
                localStorage.setItem("units", JSON.stringify({
                    units: obj
                }));
                this.setState({ unitname: '', unitdetail: '', disabled: false });
            }
        }
    }
    Units = () => {
        return (
            <>
                {this.state.units ? (
                    <div style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Modal >
                            <ModalHeader>
                                <Modaltitle>Add New Units</Modaltitle>
                                <Modalclose onClick={() => this.setState({ units: false })}>Back</Modalclose>
                            </ModalHeader>
                            <Modalcontent>
                                <ModalBody>
                                    <form className='form' onSubmit={this.handelUnit}>
                                        <div className="form-inputs">
                                            <label htmlFor="unitname" className="form-label"> Unit:
                                            </label>
                                            <input type="text"
                                                style={{ marginLeft: 95 }}
                                                id='unitname'
                                                name="unitname"
                                                placeholder="Unit......"
                                                className="form-input"
                                                value={this.state.unitname}
                                                onChange={this.handelChange}
                                            />
                                        </div>

                                        <div className="form-inputs">
                                            <label htmlFor="price" className="form-label"> Description:
                                            </label>
                                            <input type="textarea"
                                                style={{ marginLeft: 20, height: 95 }}
                                                id='unitdetail'
                                                value={this.state.unitdetail}
                                                name="unitdetail"
                                                placeholder="description....."
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <FormInputsBtn><Modalfooter disabled={this.state.disabled} type='submit' >Add Unit</Modalfooter> </FormInputsBtn>
                                    </form>
                                </ModalBody>

                            </Modalcontent>
                        </Modal></div>) : ''}
            </>
        );
    }
    units = () => {
        if (localStorage.getItem('units') !== null) {
            let unit = JSON.parse(localStorage.getItem('units'));
            return (
                <select
                    style={{ marginLeft: 105 }}
                    id='unit'
                    name="unit"
                    value={this.state.unit}
                    className="form-input"
                    onChange={this.handelChange}
                > <option value="All">All</option>


                    {unit.units.map((item) => {
                        return (
                            <option value={item}>{item}</option>);
                    })}
                </select>
            )
        }

    }
    unitsup = (val) => {
        if (localStorage.getItem('units') !== null) {
            let unit = JSON.parse(localStorage.getItem('units'));
            return (
                <select
                    style={{ marginLeft: 105 }}
                    id='unit'
                    name="unit"
                    defaultValue={val}
                    FinalValue={this.state.unit}
                    className="form-input"
                    onChange={this.handelChange}
                > <option value="All">All</option>


                    {unit.units.map((item) => {
                        return (
                            <option value={item}>{item}</option>);
                    })}
                </select>
            )
        }

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
                                <Modaltitle>Add New Products</Modaltitle>
                                <Modalclose onClick={() => this.closeModelHandeler()}>Back</Modalclose>
                            </ModalHeader>
                            <Modalcontent>
                                <ModalBody>
                                    <form className='form' onSubmit={this.handelSubmit}>
                                        <div className="form-inputs">
                                            <label htmlFor="name" className="form-label"> Name:
                                            </label>
                                            <input type="text"
                                                style={{ marginLeft: 95 }}
                                                id='name'
                                                name="name"
                                                placeholder="Product name......"
                                                className="form-input"
                                                value={this.state.name}
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="category" className="form-label"> Category:
                                            </label>
                                            <select
                                                style={{ marginLeft: 65 }}
                                                id='category'
                                                name="category"
                                                value={this.state.category}
                                                className="form-input"
                                                onChange={this.handelChange}
                                            > <option value='All'>All Category</option>
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
                                                style={{ marginLeft: 95 }}
                                                id='brand'
                                                name="brand"
                                                value={this.state.brand}
                                                className="form-input"
                                                onChange={this.handelChange}
                                            ><option value='All'>All Brands</option>
                                                {this.state.brands.map((item, index) => {

                                                    return (
                                                        <option value={item.brand} style={{ textTransform: 'capitalize' }}>{item.brand}</option>
                                                    )

                                                })}

                                            </select>
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="unit" className="form-label"> Unit:
                                            </label>
                                            {this.units()}

                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="price" className="form-label"> Price:
                                            </label>
                                            <input type="text"
                                                style={{ marginLeft: 105 }}
                                                id='price'
                                                value={this.state.price}
                                                name="price"
                                                placeholder="Price....."
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="alert" className="form-label">Alert Quantity:
                                            </label>
                                            <input type="text"
                                                style={{ marginLeft: 10 }}
                                                id='alert'
                                                name="alert"
                                                placeholder="Alert Quantity....."
                                                value={this.state.alert}
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="opening" className="form-label">Opening stock:
                                            </label>
                                            <input type="text"
                                                style={{ marginLeft: 10 }}
                                                id='opening'
                                                name="opening"
                                                value={this.state.opening}
                                                placeholder="Current Opening stock ....."
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <FormInputsBtn><Modalfooter disabled={this.state.disable} type='submit' >Add Product</Modalfooter> </FormInputsBtn>
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
                                <Modaltitle>Edit Produts</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ up: false }) }}>Back</Modalclose>
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
                                                        style={{ marginLeft: 95 }}
                                                        id='brand'
                                                        name="brand"
                                                        // value={item.brand}
                                                        defaultValue={item.brand}
                                                        FinalValue={this.state.brand}
                                                        className="form-input"
                                                        onChange={this.handelChange}
                                                    ><option value='All'>All Brands</option>
                                                        {this.state.brands.map((item, index) => {

                                                            return (
                                                                <option value={item.brand} style={{ textTransform: 'capitalize' }}>{item.brand}</option>
                                                            )

                                                        })}

                                                    </select>
                                                </div>
                                                <div className="form-inputs">
                                                    <label htmlFor="unit" className="form-label"> Unit:
                                                    </label>
                                                    {this.unitsup(item.unit)}
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
                                                <FormInputsBtn> <Modalfooter disabled={this.state.disable} type='submit' >Update Products</Modalfooter></FormInputsBtn>

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
            <>   <Card>
                <Head>
                    <div id='title'> Recepie </div>
                    {/* <Btn id='newuser'
                        style={{ backgroundImage: 'linear-gradient(to bottom,#6190E8 ,#A7BFE8)' }}
                        onClick={this.handelAdd}
                    > New Products
               </Btn> */}
                    {/* <Btn id='newuser'
                        style={{ backgroundImage: 'linear-gradient(to bottom,#67B26F ,#4ca2cd)' }}
                        onClick={() => this.setState({ units: true })}
                    > Add Units
               </Btn> */}
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
                                        Recepie Name
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Recpeie Image
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Category
                                    </TableCell>
                                    {/* <TableCell align="center" style={{ fontSize: 16 }}>
                                        Brand
                               </TableCell> */}
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Price
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Units
                                    </TableCell>
                                    {/* <TableCell align="center" style={{ fontSize: 16 }}>
                                        Action
                               </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.value.map((item, index) => {
                                    console.log(item);
                                    const price = item.category === 'beverage and drink' ? item.salesPrice : item.cost;
                                    const imagePath = `${process.env.REACT_APP_SERVER_URL}/${item.image}`;
                                    return (
                                        <TableRow key={index} >
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
                                                {item.name}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
                                                <img src={imagePath} alt={item.name} style={{ height: 40, width: 40 }} />
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {item.category}
                                            </TableCell>
                                            {/* <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                {item.brand}
                                            </TableCell> */}

                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center">
                                                Rs: {price}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 18, textTransform: 'capitalize' }} align="center">
                                                {item.unit}
                                            </TableCell>
                                            {/* <TableCell width="5%" style={{ fontSize: 16, alignItems: 'center', justifyContent: 'center' }} align="center">
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Btn style={{ background: 'red' }} value={item.id}
                                                        onClick={() => this.handelDelete(item._id)}
                                                    >Delete</Btn>
                                                    <Btn style={{ background: '#3498db' }} value={item.id}
                                                        onClick={() => this.upda(item._id)}
                                                    >Modify</Btn></div>
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
                <div>
                    {this.AddNew()}
                    {this.funUpdate()}
                    {this.Units()}
                </div>
                <div>
                </div> </>
        );
    };
};
export default Products;
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
} from "./support/Category.element";
export class Brand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            shop: '',
            detail: '',
            token: this.props.token,
            count: 'this.props.value',
            val: false,
            up: false,
            upid: '',
            value: [], disabled: false,
            fromErrors: { name: '', detail: '' },
            apiurl: process.env.REACT_APP_SERVER_URL
        }
        this.handelSubmit = this.handelSubmit.bind(this);
        // this.handelUpdate=this.handelUpdate.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
        this.handelAdd = this.handelAdd.bind(this);
        this.upda = this.upda.bind(this);
        this.getData = this.getData.bind(this);
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
    getData = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        this.setState({
            ...this.state,
            name: '',
            detail: ''

        })
        const apiUrl = `${this.state.apiurl}/item/brands?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        this.setState({ value: data });
        this.setState({ up: false });
    }
    closeModelHandeler = () => this.setState({ val: false });
    handelDelete = async (item) => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/delete-category/${item}?device=1`;
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
        const apiUrl = `${this.state.apiurl}/item/update-category/${id}?device=1`;
        await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
    }
    handelChange = e => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
        });
    }
    handelSubmit = async (e) => {
        e.preventDefault();
        this.setState({ disabled: true });
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/add-brand`;
        const response = await fetch(apiUrl, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "category_list": 'no list',
                "brand_name_input": this.state.name,
                "description_input": this.state.detail,
                'device': 1

            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
            this.setState({ disabled: false });
        }
        else {
            alert(data.message);
            this.setState({ disabled: false });
            this.getData();
        }
    }
    AddNew = () => {
        return (
            <>
                {this.state.val ? (
                    <div style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Modal >
                            <ModalHeader>
                                <Modaltitle>Add New Brand</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ val: false }) }}>Back</Modalclose>
                            </ModalHeader>
                            <Modalcontent>
                                <ModalBody>
                                    <form className='form' onSubmit={this.handelSubmit}>
                                        <div className="form-inputs">
                                            <label htmlFor="name" className="form-label"> Brand Name:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 0 }}
                                                id='name'
                                                name="name"
                                                placeholder="Brand name......"
                                                className="form-input"
                                                value={this.state.name}
                                                onKeyDown={this.handelChange}
                                                onChange={this.handelChange}
                                                onKeyPress={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="detail" className="form-label"> Detail:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 54 }}
                                                id='detail'
                                                name="detail"
                                                placeholder="detail....."
                                                className="form-input"
                                                value={this.state.detail}
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        {/* <div className="form-inputs">
                <label htmlFor="shop" className="form-label"> Shope type:
                </label>
                <input type="text" 
                style={{marginLeft:0}}
                    id='shop'
                    name="shop"
                    placeholder="shope type....."
                    className="form-input"
                    onChange={this.handelChange}
                    />
                    </div> */}
                                        <FormInputsBtn>
                                            <Modalfooter type='submit' disabled={this.state.disabled} >Add Brand</Modalfooter>

                                        </FormInputsBtn>
                                    </form>
                                </ModalBody>

                            </Modalcontent>
                        </Modal></div>) : ''}</>
        );
    }
    funUpdate = () => {
        return (
            <>
                {this.state.up ? (
                    <div style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 300,
                        marginTop: '10%'
                    }}>
                        <Modal style={{ border: '1px solid black', }}>
                            <ModalHeader>
                                <Modaltitle>Edit Brand</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ up: false }) }}>X</Modalclose>
                            </ModalHeader>
                            {this.state.value.filter(value => value._id === this.state.upid).map((item, index) => {
                                return (
                                    <Modalcontent>
                                        <ModalBody>
                                            <form className='form' onSubmit={this.handelUpdate} key={index}>
                                                <div className="form-inputs">
                                                    <label htmlFor="Category" className="form-label"> Name: </label>
                                                    <input type="text"
                                                        style={{ marginLeft: 45 }}
                                                        id='name'
                                                        name="name"
                                                        placeholder="Category......"
                                                        className="form-input"
                                                        defaultValue={item.category}
                                                        FinalValue={this.state.name}
                                                        onChange={this.handelChange} /></div>
                                                <div className="form-inputs">
                                                    <label htmlFor="detail" className="form-label"> Detail:</label>
                                                    <input type="text"
                                                        style={{ marginLeft: 45 }}
                                                        id='detail'
                                                        name="detail"
                                                        placeholder="detail....."
                                                        className="form-input"
                                                        defaultValue={item.description}
                                                        FinalValue={this.state.detail}
                                                        onChange={this.handelChange} /></div>
                                                <Modalfooter type='submit' >Update</Modalfooter>
                                            </form>
                                        </ModalBody>
                                    </Modalcontent>);
                            }
                            )}
                        </Modal></div>) : ''}</>
        );
    }
    render() {
        return (
            <> <Card>
                <Head>
                    <div id='title'> Brands </div>
                    <Btn id='newuser' style={{ backgroundImage: 'linear-gradient(to bottom,#6190E8 ,#A7BFE8)' }}
                        onClick={this.handelAdd} >New Brand </Btn></Head>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TableContainer  >
                        <Table  >
                            <TableHead height="5" style={{ background: '#bdc3c7', height: 5 }}>
                                <TableRow >
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        S.N
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Brand Name
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Detail
                               </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {this.state.value.map((item, index) => {
                                    return (
                                        <TableRow key={index} >
                                            <TableCell style={{ fontSize: 16 }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
                                                {item.brand}
                                            </TableCell>

                                            <TableCell style={{ fontSize: 16, textTransform: 'capitalize' }} align="center" >
                                                {item.description}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody></Table></TableContainer></div></Card>
                <           div>
                    {this.AddNew()}
                    {this.funUpdate()}
                </div></>
        );
    };
};
export default Brand;
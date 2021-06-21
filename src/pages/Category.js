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
    Card, FormInputsBtn,
    Head,
    Btn
} from "./support/Category.element";
export class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            shop: '',
            detail: '',
            token: this.props.token,
            count: 'this.props.value',
            val: false,
            up: false, disabled: false,
            upid: '',
            value: [],
            apiurl: process.env.REACT_APP_SERVER_URL
        }
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelUpdate = this.handelUpdate.bind(this);
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
        this.setState({
            name: '',
            shop: '',
            detail: '',
        });
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/categories?device=1`;
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
    handelUpdate = async (e) => {
        e.preventDefault();
        this.setState({ disabled: true });
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        const val = this.state.value.find(value => value._id === this.state.upid);
        alert(this.state.name);
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/update-category`;
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "category_input": this.state.name,
                "shop_input": this.state.shop,
                "description_input": this.state.detail,
                "id": this.state.upid

            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
            this.setState({ disabled: false });
        } else {
            alert(data.message)
            this.setState({ disabled: false });
            this.getData();
        }
    }
    handelSubmit = async (e) => {
        e.preventDefault();
        this.setState({ disabled: true });
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/add-category`;
        const response = await fetch(apiUrl, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "category_input": this.state.name,
                "shop_input": this.state.shop,
                "description_input": this.state.detail,
                "device": 1

            })
        });

        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
            this.setState({ disabled: false });
        }
        else {
            alert(data.message)
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
                                <Modaltitle>Add New category</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ val: false }) }}>Back</Modalclose>
                            </ModalHeader>
                            <Modalcontent>
                                <ModalBody>
                                    <form className='form' onSubmit={this.handelSubmit}>
                                        <div className="form-inputs">
                                            <label htmlFor="name" className="form-label"> Name:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 45 }}
                                                id='name'
                                                name="name"
                                                placeholder="Category......"
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
                                                style={{ marginLeft: 45 }}
                                                id='detail'
                                                name="detail"
                                                value={this.state.detail}
                                                placeholder="detail....."
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <div className="form-inputs">
                                            <label htmlFor="shop" className="form-label"> Shope type:
                </label>
                                            <input type="text"
                                                style={{ marginLeft: 0 }}
                                                id='shop'
                                                value={this.state.shop}
                                                name="shop"
                                                placeholder="shope type....."
                                                className="form-input"
                                                onChange={this.handelChange}
                                            />
                                        </div>
                                        <FormInputsBtn><Modalfooter
                                            disabled={this.state.disabled}
                                            type='submit' >Add Category</Modalfooter></FormInputsBtn>
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
                    }}>
                        <Modal style={{ border: '1px solid black', }}>
                            <ModalHeader>
                                <Modaltitle>Edit Category</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ up: false }) }}>Back</Modalclose>
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
                                                        FinalValue={this.state.name !== null ? this.state.name : item.name}
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
                                                <div className="form-inputs">
                                                    <label htmlFor="shop" className="form-label"> Shope type:</label>
                                                    <input type="text"
                                                        style={{ marginLeft: 0 }}
                                                        id='shop'
                                                        name="shop"
                                                        placeholder="shope type....."
                                                        className="form-input"
                                                        defaultValue={item.shop}
                                                        FinalValue={this.state.shop}
                                                        onChange={this.handelChange} /></div>
                                                <FormInputsBtn>
                                                    <Modalfooter disabled={this.state.disabled} type='submit' >Update Category</Modalfooter>
                                                </FormInputsBtn>

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
                    <div id='title'> Category </div>
                    <Btn id='newuser' style={{ backgroundImage: 'linear-gradient(to bottom,#6190E8 ,#A7BFE8)' }}
                        onClick={this.handelAdd} >New Category </Btn></Head>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TableContainer  >
                        <Table >
                            <TableHead height="5" style={{ background: '#bdc3c7', height: 5 }}>
                                <TableRow >
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        S.N
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Category
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        ShopeType
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Detail:
                               </TableCell>
                                    <TableCell align="center" style={{ fontSize: 16 }}>
                                        Action
                               </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {this.state.value.map((item, index) => {
                                    return (
                                        <TableRow key={index} >
                                            <TableCell style={{ fontSize: 14, textTransform: 'capitalize' }} align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 14, textTransform: 'capitalize' }} align="center" width='20%' >
                                                {item.category}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 14, textTransform: 'capitalize' }} align="center" >
                                                {item.shop}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 14, textTransform: 'capitalize' }} align="center" >
                                                {item.description}
                                            </TableCell>
                                            <TableCell style={{ fontSize: 14 }} align="center" width='20%'>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <input type="hidden" value={item.id} />
                                                    <Btn style={{ background: 'red', width: '100%' }} value={item.id}
                                                        onClick={() => this.handelDelete(item._id)}
                                                    >Delete</Btn>
                                                    <Btn style={{ background: '#3498db', width: '100%' }} value={item.id}
                                                        onClick={() => this.upda(item._id)}>Modify</Btn></div>
                                            </TableCell> </TableRow>
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
export default Category;
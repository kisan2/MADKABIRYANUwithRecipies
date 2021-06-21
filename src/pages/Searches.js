import { getByDisplayValue } from '@testing-library/react';
import React, { Component } from 'react';
import '../App.css';
import './styles.css';
import FormEntery from './support/Pos.element'

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            open: false,
            ref: null,
            query: '',
            apiurl: process.env.REACT_APP_SERVER_URL,
        }
        this.getcustomer = this.getcustomer.bind(this);
        this.handelsubmit = this.handelsubmit.bind(this);
    }
    componentDidMount() {
        this.getcustomer();

    };
    label = 'name';
    getcustomer = async () => {

        this.setState({
            up: false
        });
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/customers?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(items => items.json());
        this.setState({
            countries: [...this.state.countries, ...data]
        });
    }

    close(e) {
        this.setState({ open: e && e.target === this.ref.current })

    }
    filter(options) {
        const query = this.state.query.toLowerCase();

        return options.filter(
            option => option[this.props.label].toString().toLowerCase().indexOf(query) >= 0)
    }

    displayValue() {
        if (this.state.query.length > -1) return this.state.query;
        if (this.props.value) return this.props.value[this.props.label];
        return '';
    }

    onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handelsubmit = e => {
        e.preventDeault();
    }

    render() {
        return (
            <div className='dropdown'>
                <div className='control' onClick={() => this.setState({ open: !this.state.open })}>
                    <div className='selected-value' ref={this.state.open}>
                        <form onSubmit={this.handelsubmit}>
                            <input
                                type='text'

                                ref={this.state.ref}
                                placeholder={this.props.value ? this.props.value[this.props.label] : this.props.prompt}
                                value={this.displayValue()}
                                // value={this.state.query}
                                onChange={e => {
                                    this.setState({ query: e.target.value })
                                    // this.onChange()
                                    // this.props.onChange(e.target.value)
                                    this.props.onChange(e.target.value)
                                }}
                            />
                        </form>

                    </div>
                    <div className={`arrow ${this.state.open ? "open" : null}`} />
                </div>
                <div className={`options ${this.state.open ? "open" : null}`}>
                    {this.filter(this.props.options).map(country =>
                        <div
                            key={country[this.props.id]}
                            className={`option ${this.props.value === country ? "selected" : null}`}
                            onClick={() => {
                                this.setState({ query: '' })
                                this.props.onChange(country);
                                this.setState({ open: false, });
                            }}
                        >
                            {country[this.props.label]}</div>
                    )
                    }
                </div>
            </div>
        )
    }
}

export default Search;

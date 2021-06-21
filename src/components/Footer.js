import React, { Component } from 'react';
import  styled from "styled-components";


const Foot=styled.div`
height:30px;
font-size:22px;
width:100%;
margin-top:10px;
align-items:center;
justify-content:center;
text-align:center;
background:#ecf0f1;
`;



export class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <Foot>
                Copyright © 2021 Lumbini.dandholdings.com All rights reserved.
                
                </Foot>
            </div>
        );
    }
}

export default Footer;

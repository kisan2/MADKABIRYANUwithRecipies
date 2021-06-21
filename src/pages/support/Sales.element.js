import styled from 'styled-components';


export const PosWrapper=styled.div`
display:flex;
width:80%;
height:100%;
margin-top:20px;
margin:10px;
border:none;
align-items:left;
justify-content:left;
border-radius:5px;
//box-shadow:1px 0px 5px black;

@media screen and (max-width:1000px){
    display:flex;
    width:80%;
    height:100%;
    flex-direction:column;
}

`;
export const PosItemcontainer=styled.div`
display:flex;
flex:50%;
width:100%;
margin:5px;
height:800px;
flex-direction:column;
border:2px solid blue;
//border-left:none;
border-radius:10px;
align-items:center;
@media screen and (max-width:1000px){
    display:flex;
 
}



`;
export const PosCalculation=styled.div`
display:flex;
flex:100%;
flex-direction:column;
border:2px solid blue;
border-radius:10px;
width:900px;
margin:5px;
height:600px;
max-height:800px;
#title{
    font-size:20px;
    color:#3498db;
    font-family:Arial;
    font-style:bold;
    font-weight:450;
  
}
@media screen and (max-width:1000px){
display:flex;
width:100%;
margin:5px;
height:600px;
       
}

`;
export const PosItemFilter=styled.div`
display:flex;
flex-direction:row;
margin:5px;
width:100%;
justify-content:space-between;
padding:10px;
border-top:1px solid lightgrey;
margin-top:0px;


`;

export const PosItemContent=styled.div`
display:flex;
height:100%;
width:100%;
padding:0px;
margin:0px;
border:3px solid white;
#stock{
    height:30px;
    width:30px;
    margin:2px auto;
    font-size:19px;
    align-items:center;
    justify-content:center;
    text-align:center;
}
#stoc{
    height:31px;
    width:90px;
    margin-top:0px;
    font-size:18px;
    align-items:center;
    justify-content:center;
    text-align:center;
}


`;

export const Paymentdetail = styled.div`
background:white;
 width:95%;
 height:100%;
 display:flex;
 flex-direction:column;
 align-items:center;

 justify-content:space-evenly;
 margin:10px auto;
 margin-left:2%;
 padding:5px;

`;
export const Paymentrec = styled.div`
flex:50%;
width:100%;
 height:100%;
 display:flex;
 flex-direction:column;
 font-size:20px;
 justify-content:left;
 border-top:1px solid black;
 margin:5px auto;
 padding:0px;

`;
export const Posrec = styled.div`
 display:flex;
 flex-direction:row;
 flex-wrap:wrap;
 font-size:20px;
 justify-content:space-evenly;
 margin:5px auto;
 padding:5px;

`;


export const PaymentBtn = styled.button`
 width:300px;
 height:50px;
 font-size:22px;
 color:white;
 background:#2980b9;
 padding:10px;
 margin:10px;
 outline:none;
 cursor:pointer;
 border:none;
 border-radius:10px;
`;

export const Select = styled.select`
 display:flex;
 width:90%;
 flex:90%;
 outline:none;
 height:40px;

`;
export const Form = styled.form`
 display:flex;
 width:90%;
 flex:90%;
 outline:none;
 height:40px;

`;
export const Filterdata = styled.div`
display:flex;
flex-direction:row;
width:90%;

`;
export const Addcustomer = styled.button`
height:40px;
cursor:pointer;
background:white;
outline:none;
border:none;
border-right:1px solid black;
border-top:1px solid black;
border-bottom:1px solid black;
`;

export const Filteritemval = styled.input`
display:flex;
width:90%;
outline:none;
height:40px;
margin-left:10px;

`;

export const Modal = styled.div`
background:white;
width:90%;
align-items:center;
justify-content:center;
position:absolute;
top:100px;
left:400px;
max-width:800px;
margin:10px auto;
transition:all 1.3s ease;
`;
export const ModalHeader = styled.div`
display:flex;
flex-direction:row;
background:#2c2c2c;
color:white;
padding:10px;
top:100px;

`;
export const Modalclose = styled.span`
display:flex;
flex:5%;
justify-content:center;
align-items:center;
font-size:22px;
cursor:pointer;

`;
export const Modaltitle = styled.div`
display:flex;
flex:95%;
font-size:22px;
justify-content:center;

`;
export const Modalcontent = styled.div`
display:flex;
align-items:center;
flex-direction:column;
justify-content:center;
padding:10px;
background:white;

`;
export const ModalBody = styled.div`
margin-bottom:10px;
`;
export const Modalfooter= styled.button`
width:100%;
height:45px;
font-size:18px;
align-item:center;
justify-content:center;
outline:none;
padding:0px;
background:green;
color:#fff;
border:none;
border-radius:10px;
margin:10px auto;
:hover{
    background:blue;
}
`;

export const ModuleCont = styled.div`
display: flex;
  left: 90px;
  margin-left: 100px;
  width: 90%;
  height: 100%;
  margin: 0px 0;
  padding: 0px 100px 0px 150px;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
  background:white;
  margin-bottom:10px;
 
`;

export const Card =  styled.button`
width: 30%;
height:70px;
border-radius: 10px;
align-items:center;
justify-content:center;
text-align:center;
background-color: #bdc3c7;
margin-top: 40px;
font-size:22px;
outline:none;
cursor:pointer;
margin-bottom:10px;



`;

export const Btn = styled.button`
align-items:center;
justify-content:center;
padding:0px;
width:7%;
height:40px;
margin:5px;
font-size:18px;
outline:none;
cursor:pointer;
border:none;

border-radius:10px;

`;
export const Span = styled.span`
text-align: center;
display: block;
text-transform: capitalize;
color: #c0392b;
font-weight: 600;
border: 2px solid #c0392b;
padding: 10px 0;
background: rgb(255,176,176);
width: 30%;
margin: 20px auto;
}
`;
 export const FormInputs = styled.div`
margin-top: 10px;
display: flex;
margin:10px;
font-size:16px;
font-weight:600;
font-style:bold;
font-family:Arial;
align-items:left;

margin-bottom:10px;
flex-direction:row;
@media screen and (max-width:1000px){
  align-items:left;
   }
 `;
 export const FormInputsBtn = styled.div`
 margin-top: 10px;
 display: flex;
 margin-bottom:10px;
 flex-direction:row;
   align-items:center;
   justify-content:center
   
  `;
 export const FormLabel = styled.label`
    width:100%;
    font-size: 16px;
    margin-bottom: 6px;
    color: rgb(3, 3, 3);
    @media screen and (max-width:1000px){
      font-size: 16px;
      
      }
 `;
 export const FormInput = styled.select`
    display: block;
    font-size: 16px;
    border-radius: px;
    height: 40px;
    margin-top:5px;
    outline:none;
    width: 150px;
    ::placeholder{
      color: #95a5a6;
      font-size: 18px;
    }
    @media screen and (max-width:1000px){
      width:150px;
      height:40px;
      font-size: 16px;
      ::placeholder{
         color: #95a5a6;
         font-size: 14px;
       }
      
      }
 `;
 export const FormEntery = styled.input`
 display: block;
 font-size: 16px;
 border-radius: px;
 height: 40px;
 margin-top:5px;
 outline:none;
 width: 150px;
 ::placeholder{
   color: #95a5a6;
   font-size: 18px;
 }
 @media screen and (max-width:1000px){
   font-size: 16px;
   ::placeholder{
      color: #95a5a6;
      font-size: 16px;
    }
   
   }
`;
export const Button =styled.button`
align-items:center;
justify-content:center;
padding:0px;
width:7%;
height:40px;
background:;
margin:5px;
font-size:18px;
outline:none;
cursor:pointer;
border:none;
border-radius:10px;


`;
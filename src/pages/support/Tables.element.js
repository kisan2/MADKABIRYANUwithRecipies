import styled from 'styled-components';

export const Modal = styled.div`
width:100%;
height:90%;
background:white;
align-items:center;
justify-content:center;
position:absolute;
top:80px;
margin:0px auto;
transition:all 1.3s ease;
`;
export const ModalHeader = styled.div`
display:flex;
flex-direction:row;
background:#3498db;
color:white;
padding:20px;

`;
export const Modalclose = styled.div`
display:flex;
border:none;
border-radius:10px;
width:120px;
height:45px;
padding:5px;
background-image: linear-gradient(to bottom,#22c1c3 ,#fdbb2d);
justify-content:center;
align-items:center;
text-align:center;
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
background:grey;
flex-direction:column;
//margin-top:20px;



`;
export const ModalBody = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100%;
width:100%;
flex-direction:column;
background:white;

padding:10px;

`;
export const Modalfooter= styled.button`
width:50%;
height:50px;
font-size:18px;
align-item:center;
justify-content:center;
outline:none;
padding:0px;
background:#3498db;
color:#fff;
border:none;
margin-bottom:10px;
border-radius:10px;
margin:10px ;
cursor:pointer;
`;

export const Card=styled.div`
width: 100%;
height:100%;
border-radius: 10px;
border: 2px solid rgb(243, 241, 241);
 margin-top: 40px;
// margin-left: 50px;
//box-shadow: 2px 5px rgb(252, 251, 251);
padding:10px;

`;
export const Head=styled.div`
display:flex;
width:100%;
flex-direction:row;
height:50px;
margin-bottom:10px;

align-items:center;
justify-content:center;
 #title{
     display:flex;
     flex:50%;
   font-size:22px;
   justify-content:flex-start;
  align-items:center;
  margin-left:5%;
   
  
  
   
 }
 #newuser{
    display:flex;
   
  justify-content:flex-end;
  align-items:center;
  margin-right:5%;
  

 }

`;
export const Btn=styled.button`
display:flex;
widht:150px;
font-size:16px;
cursor:pointer;
justify-content:center;
align-items:center;
height:45px;
color:white;
padding:10px;
margin:10px;
background:#3498db;
border:none;
outline:none;
border-radius:5px;
decoration:none;
#addcircleicon {
   
    width:20px;
    margin:5px;
}
#negative{
    background:red;
}
`;
export const FormInputsBtn = styled.div`
display: flex;
margin-bottom:10px;
flex-direction:row;
margin-left:10%;  
align-items:center;
justify-content:center
  
 `;
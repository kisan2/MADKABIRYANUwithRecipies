import styled from 'styled-components';




export const Modal = styled.div`

width:100%;
height:100%;
position:relative;
top:10px;
margin-top:50px;

bottom:0px;

align-items:center;
justify-content:center;
text-align:center;


transition:all 1.3s ease;
`;
export const ModalHeader = styled.div`
display:flex;
flex-direction:column;
padding:0px;
text-align:center;
justify-content:center;


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
font-size:26px;
justify-content:flex-end;

`;
export const Modalcontent = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin-top:20px;

`;
export const ModalBody = styled.div`
display:flex;
align-items:center;
margin-left:0px;
flex-direction:column;
text-align:left;

padding:0px;

`;
export const Modalfooter= styled.button`
width:100%;
height:50px;
font-size:18px;
align-item:center;
justify-content:center;
outline:none;
padding:0px;
background:green;
color:#fff;
border:none;
margin-left:90px;
border-radius:10px;
margin:10px ;
`;



export const Card=styled.div`
width: 90%;
height:100%;

margin-top: 40px;
margin-left: 50px;
box-shadow: 2px 5px rgb(252, 251, 251);
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
   margin-right:5%;

  

 }

`;
export const Btn=styled.button`
display:flex;
width:150px;
font-size:18px;
cursor:pointer;
justify-content:center;
align-items:center;
text-align:center;
height:45px;
color:white;
padding:10px;
margin:10px;
background:green;
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
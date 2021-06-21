import React from 'react'

import{
    Modal,
    ModalHeader,
    Modalclose,
    Modaltitle,
    Modalcontent,
    ModalBody,
    Modalfooter,

} from './Model.element';

const Form=()=>{
    return(
        <>
    
       <Modal style={{  border:'1px solid black',
      }}>
            <ModalHeader>
            <Modaltitle>Daily opening</Modaltitle>
           
            </ModalHeader>
         
                <Modalcontent>
                <ModalBody>
                    <form className='form' >
            <div className="form-inputs">
                <label htmlFor="id" className="form-label"> Id:
                </label>
                <input type="text" 
                style={{marginLeft:78}}
                id='id'
                    name="id"
                    placeholder="id......"
                    className="form-input"
          
                    
                    
                    />
                    </div>
                    <div className="form-inputs">
                <label htmlFor="name" className="form-label"> Name:
                </label>
                <input type="text" 
                style={{marginLeft:33}}
                id='name'
                    name="name"
                    placeholder="Customer name......"
                    className="form-input"
                 
                    
                    
                    />
                    </div>
                    <div className="form-inputs">
                <label htmlFor="price" className="form-label"> Item:
                </label>
                <input type="text" 
                style={{marginLeft:45}}
                id='address'
                    name="price"
                    placeholder="Item....."
                    className="form-input"
           
                    
                    
                    />
                    </div>
                    <div className="form-inputs">
                <label htmlFor="details" className="form-label">Amount:
                </label>
                <input type="text" 
                style={{marginLeft:10}}
                id='details'
                    name="details"
                    placeholder="details......"
                    className="form-input"
               
                    
                    
                    />
                    </div>
                    


                  <Modalfooter  type='submit' >Add</Modalfooter> 
        
                


                    </form>
                </ModalBody>
            
                </Modalcontent>
                
               
            
            
            
           
            
        </Modal>
        </>
    );
    
}


export default Form;

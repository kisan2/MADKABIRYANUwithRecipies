import React, { useRef } from 'react';
import { ComponentToPrint } from './Componenttopprint';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router-dom';
export const Example = () => {
  let location = useLocation();
  const data = location.state.order;
  const customername = location.state.customername;
  const grand = location.state.grand;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div style={{
      alignItems: 'center',
      width: '90%', position: 'absolute', left: 80, justifyItems: 'center',
      textAlign: 'center',
      justifyContent: 'center'
    }}>
      <ComponentToPrint ref={componentRef} data={data} customername={customername} grand={grand} />
      <button style={{ height: 65, width: 190, fontSize: 24, margin: 40 }}
        onClick={handlePrint}>Print this Bill</button>
    </div>
  );
};
export default Example;
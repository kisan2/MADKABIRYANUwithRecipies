import React from 'react';
import './Modal.css';
import BackDrop from '../BackDrop/BackDrop';




class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.childern !== this.props.childern;

    }
    componentDidUpdate() {
        console.log('[modal] will update')
    }

    render() {
        return <>
            <BackDrop show={this.props.show}
                clicked={this.props.modalClosed}>


                <div className="Modal" style={{
                    transform: this.props.show ? 'translateY(10%)' : 'translateY(-100%)',
                    opacity: this.props.show ? '1' : '0'
                }}>

                    {this.props.children}




                </div>

            </BackDrop>
        </>;
    }

}

export default Modal;
import React from 'react';
import './BackDrop.css';
import { useSpring, animated } from 'react-spring';


const BackDrop = (props) => {
    // const transitions = useTransition(props.show, {
    //     from: {
    //         position: 'absolute', opacity: 0,
    //         // transform: props.show ? `translateX(0)` : `translateX(100%)`

    //     },
    //     enter: { opacity: 1 },
    //     leave: { opacity: 0 },
    //     reverse: props.show,
    //     delay: 200,
    //     // config: config.molasses,
    //     onRest: () => props.show,
    // })

    const rightMenuAnimation = useSpring({
        marginTop: props.show ? 100 : -100,
        opacity: props.show ? 1 : 0,
        delay: 300,
        transform: props.show ? `translateY(40%)` : `translateY(-100%)`
    });
    const leftMenuAnimation = useSpring({
        marginLeft: props.show ? 0 : -100,
        opacity: props.show ? 1 : 0,
        delay: 300,
        transform: props.show ? `translateX(0%)` : `translateX(-100%)`
    });

    return props.show ? <div className="BackDrop"
        onClick={props.clicked}
    >



        <animated.div style={!props.name ? rightMenuAnimation : leftMenuAnimation}>
            {props.children}
        </animated.div>




    </div> : null

};

export default BackDrop;
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Card = () => {
    const rippleContainerRef = useRef(null);
    const rodRef = useRef(null);
    const golaRef = useRef(null);
    const [intervalID, setIntervalID] = useState(null);

    const ripling = () => {
        const ripple = document.createElement("div");
        ripple.classList.add("ripple");
        rippleContainerRef.current.appendChild(ripple);

        gsap.fromTo(ripple,{
            scale: 0,
            opacity: 5
        }, {
            scale: 18,
            opacity: 0,
            duration: 6,
            ease: "power1.inOut",
            onComplete: () => ripple.remove(),
        });
    };

    const handleMouseEnter = () => {
        ripling();
        const id = setInterval(ripling, 1300);
        setIntervalID(id);

        // setTimeout(() => {
            rodRef.current.style.display = "inline-block";
            golaRef.current.style.display = "inline-block";
        // }, 400);
    };

    const handleMouseLeave = () => {
        clearInterval(intervalID);

        const allRipples = rippleContainerRef.current.querySelectorAll(".ripple");
        allRipples.forEach((ripple) => ripple.remove());

        rodRef.current.style.display = "none";
        golaRef.current.style.display = "none";
    };

    return (
        <div id="card-Container">
            <div
                className="card"
                ref={rippleContainerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            > Hover Me </div>
            <div className="rod" ref={rodRef}></div>
            <div className="gola" ref={golaRef}></div>
        </div>
    );
};

export default Card;

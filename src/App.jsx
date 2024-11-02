/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Card = () => {
    const rippleContainerRef = useRef(null);
    const rodRef = useRef(null);
    const golaRef = useRef(null);
    const [intervalID, setIntervalID] = useState(null);
    const [hasEntered, setHasEntered] = useState(false);

    const ripling = () => {
        const ripple = document.createElement("div");
        ripple.classList.add("ripple");
        rippleContainerRef.current.appendChild(ripple);

        gsap.fromTo(ripple, {
            scale: 0,
            opacity: 1
        }, {
            scale: 20,
            opacity: 0,
            duration: 6,
            ease: "power1.out",
            onComplete: () => ripple.remove(),
        });
    };

    const handleMouseEnter = () => {
        ripling();
        const id = setInterval(ripling, 1300);
        setIntervalID(id);
        setHasEntered(true);
    };

    const handleMouseLeave = () => {
        clearInterval(intervalID);
        setHasEntered(false);
        const allRipples = rippleContainerRef.current.querySelectorAll(".ripple");
        allRipples.forEach((ripple) => ripple.remove());
    };

    useEffect(() => {
        return () => clearInterval(intervalID);
    }, [intervalID]);

    return (
        <div
            id="main"
            className="flex items-center justify-center w-screen h-screen bg-neutral-950">
            <div
                id="card-Container"
                style={{ perspective: '1000px' }}>
                <div
                    className="card w-[300px] h-[400px] bg-[#4CAF50] rounded-lg flex items-center justify-center text-slate-50 text-4xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-transform duration-1000 ease-in-out origin-bottom"
                    style={{ transformStyle: 'preserve-3d' }}
                    ref={rippleContainerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Hover Me
                </div>
                <div
                    className={`gola  ${hasEntered ? "block" : "hidden"} absolute top-[44%] left-[50.5%] h-[0.16vw] w-[0.16vw] rounded-full bg-white translate-center-top`}
                    style={{ boxShadow: "0 0 5px 2px rgba(0, 247, 255, 0.7)"}}
                    ref={golaRef}
                />
                <div
                    className={`rod  ${hasEntered ? "block" : "hidden"} absolute top-[44%] left-[50.5%] h-1/2 w-[0.07vw] translate-center-top`}
                    style={{ borderRadius: "200px", background: "linear-gradient(to top,rgb(0, 255, 255) 60%,transparent 100%)"}}
                    ref={rodRef}
                />
            </div>
        </div>
    );
};

export default Card;

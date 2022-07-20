import React, {useEffect, useRef, useState} from "react";
import useResizeAware from "react-resize-aware";

// This component was copied from Samson Zhang's React Robust Accordion. 
// I had difficulties installing the package, so I put the component code in here 
// with only slight modifications. Not sure if it will build or not?

/**
 * @param {reactNode} props.children - Elements displayed in body of accordion (i.e. when expanded)
 * @param {reactNode} props.label - Elements displayed in label of accordion (i.e. when collapsed)
 * @param {boolean} [props.openState] - Optional custom state variable for external control
 * @param {function} [props.setOpenState] - Optional custom setState function for external control (required if using props.openState)
 * @param {boolean} [props.noClickLabel] - Optional flag to make clicking the label not expand the accordion. Useful if using external control
 */
const Accordion = (props:{
    className?: string,
    open?: boolean,
    openState?: boolean,
    setOpenState?: Function,
    noClickLabel?: boolean,
    children: any,
    label: any
}) => {
    const [isOpen, setIsOpen] = useState(props.setOpenState ? props.openState : !!props.open);
    const [height, setHeight] = useState(0);
    const [transition, setTransition] = useState("");
    const contentRef = useRef(null);
    const [resizeListener, sizes] = useResizeAware();

    useEffect(() => {
        if (typeof props.openState !== "undefined") toggleOpen();
    }, [props.openState]);

    useEffect(() => {
        setHeight(isOpen ? contentRef.current.scrollHeight + 1 : 0);
    }, [sizes]);

    function toggleOpen(e = null) {
        setTransition("all 0.3s ease");
        setHeight(!isOpen ? contentRef.current.scrollHeight + 1 : 0);

        if (props.setOpenState && e) {
            props.setOpenState(!isOpen);
        } else if (props.setOpenState) {
            setIsOpen(props.openState);
        } else {
            setIsOpen(!isOpen);
        }

        setTimeout(() => {
            setTransition("");
        }, 200)
    }

    return (
        <div className={props.className}>
            <div
                onClick={(e) => {
                    if (!props.noClickLabel) toggleOpen(e);
                }}
                onKeyDown={(e) => {
                    const keyPressed = e.keyCode || e.which;
                    if (!props.noClickLabel && (keyPressed === 13 || keyPressed === 32)) toggleOpen(e);
                }}
                style={{
                    cursor: props.noClickLabel ? "unset" : "pointer"
                }}
                tabIndex={props.noClickLabel ? undefined : 0} // hmm modified this to make the red squiggly go away
                role={props.noClickLabel ? "" : "button"}
            >
                {props.label}
            </div>
            <div
                style={{
                    maxHeight: height,
                    position: "relative",
                    overflowY: "hidden",
                    transition: transition
                }}
                ref={contentRef}
            >
                {props.children}
                {resizeListener}
            </div>
        </div>
    )
}


export default Accordion;
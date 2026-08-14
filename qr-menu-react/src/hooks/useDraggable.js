import {useState, useRef} from 'react';

export const useDraggable = () => {
    const dragRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        if (!dragRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - dragRef.current.offsetLeft);
        setScrollLeft(dragRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !dragRef.current) return;
        e.preventDefault();
        const x = e.pageX - dragRef.current.offsetLeft;
        dragRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    return {
        dragRef,
        isDragging,
        dragHandlers: {
            onMouseDown: handleMouseDown,
            onMouseLeave: handleMouseLeave,
            onMouseUp: handleMouseUp,
            onMouseMove: handleMouseMove,
        },
    };
};

"use client"

import { useState, useEffect } from 'react';

export const useResponsive = () => {
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const onResizeHandler = () => {
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 990;
            const isDesktop = window.innerWidth > 990;

            setState({ isMobile, isTablet, isDesktop });
        };

        onResizeHandler();

        window.addEventListener("resize", onResizeHandler);

        return () => {
            window.removeEventListener("resize", onResizeHandler);
        };
    }, []); 

    return state;
};

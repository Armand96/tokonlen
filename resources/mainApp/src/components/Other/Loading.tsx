"use client"
import React from 'react';
import  BeatLoader from 'react-spinners/BeatLoader'

const Loading = () => {
    return (
        <div className="z-[9999] fixed top-0 bottom-0 bg-white flex items-center justify-center h-screen w-screen">
            <BeatLoader size={60}  color='#696C70' />
        </div>
    );
};

export default Loading;

import React from 'react';
import {BarLoader} from 'react-spinners'

const Loading = () => {
    return (
        <div className="z-50 h-screen w-screen">
            <BarLoader width={80} height={80}  />
        </div>
    );
};

export default Loading;

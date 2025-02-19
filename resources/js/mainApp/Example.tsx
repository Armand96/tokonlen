import React from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-7xl text-green-950 font-bold">Hello World</h1>
        <p className="text-xl text-green-950 mt-2">15 Febuari 2025</p>
      </div>
    );
}

export default Example;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
            <Example/>
    )
}

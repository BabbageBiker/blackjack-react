import React, { StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import GameBoardComponents from "./components/GameBoardComponents";

const rootElem = document.getElementById('root');

if( rootElem == null ) {
    // alert('you forgot to put a root element in your HTML file.');
    throw new Error('Root element was not found');
 } // else {
const root = createRoot( rootElem as HTMLElement );

root.render(
    <React.StrictMode>
        <GameBoardComponents />
    </React.StrictMode>
);
// }



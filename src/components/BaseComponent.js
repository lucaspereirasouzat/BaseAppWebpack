import React, { memo, Fragment, useEffect, lazy, Suspense } from "react";
// import Topbar from "./Topbar";
// import Chat from "./Chat";


export default memo(({ children }) => {
    const Topbar = lazy(() => import('./Topbar'));
    const Chat = lazy(() => import('./Chat'));
    return <div >
        <Suspense fallback={<div>Loading...</div>}>

            <Topbar />
            {children}
            <Chat />

        </Suspense>
    </div>
})
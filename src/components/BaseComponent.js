import React, { memo, lazy, Suspense, Fragment, useEffect } from "react";
// import firebase from 'firebase';

const Topbar = require('./Topbar').default;



// const Chat = require('./Chat').default;
//const Topbar = lazy(() => import('./Topbar'));
export default memo(({ children }) => {

    return <Fragment >
        {/* <Suspense fallback={<div />}> */}
        <Topbar />
        {/* </Suspense> */}
        {children}
        {/* <Chat /> */}
    </Fragment>
}, () => false)
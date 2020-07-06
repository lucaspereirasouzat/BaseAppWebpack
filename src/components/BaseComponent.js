import React, { memo, lazy, Suspense } from "react";

const Topbar = require('./Topbar').default;
const Chat = require('./Chat').default;
// const Chat = lazy(() => import('./Chat'));
export default memo(({ children }) => {
    return <div>
        <Topbar />
        {children}
        <Chat />
    </div>
})
import React, { memo } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// import { verify } from "../reduxState/ducks/auth";


export default memo((props) => {
    const routes = require("../routes").default;
    const user = useSelector(({ auth }) => auth.user);
    let history = useHistory();
    // let dispatch = useDispatch();

    //useEffect(_ => dispatch(verify()), [])

    if (user) {
        if (routes.find(v => v.path == history.location.pathname).roles.some(v => v == user.Securelevel))
            return <Route {...props} />
        else
            return <Redirect to={'/'} />
    } else {
        if (routes.find(v => v.path == history.location.pathname).roles.length == 0)
            return <Route {...props} />
        else
            return <Redirect to={'/'} />
    }
}, () => false
)
import React, { memo, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../reduxState/ducks/auth";


export default memo((props) => {
    let routes = require("../routes").default;
    let history = useHistory();
    let { user } = useSelector(({ auth }) => auth);
    let dispatch = useDispatch();

    //useEffect(_ => dispatch(verify()), [])

    if (user) {
        if (routes.find(v => v.path == history.location.pathname).roles.some(v => v == user.Securelevel)) {
            return <Route {...props} />
        } else {
            return <Redirect to={'/'} />
        }
    } else {
        if (routes.find(v => v.path == history.location.pathname).roles.length == 0)
            return <Route {...props} />
        else
            return <Redirect to={'/'} />
    }
}
)
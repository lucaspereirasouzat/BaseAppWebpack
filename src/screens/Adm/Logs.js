import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { fetchLogs } from "../../reduxState/ducks/logs";
import { useDispatch, useSelector } from "react-redux";
import { BaseComponent, TableModel } from "../../components";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 300,
            flexDirection: 'row',
            display: 'flex',

        },
    },
}));

const Logs = () => {
    let [pesquisa, setPesquisa] = useState('')
    let { logs, rowsPerPage, page, total } = useSelector(({ log }) => log)
    let emailfield = useRef()

    let [errors, setErrors] = useState([])
    const classes = useStyles();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLogs())
    }, [])

    return (
        <BaseComponent>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
                <TableModel
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setPesquisa={v => { setPesquisa(v); dispatch(fetchLogs(page, rowsPerPage, v)); }}
                    onChangeRowsPerPage={e => dispatch(fetchLogs(page, e.target.value, pesquisa))}
                    onChangePage={(e, apage) => dispatch(fetchLogs(apage, rowsPerPage, pesquisa))}
                    header={['Data', 'Titulo', 'Corpo']}
                    data={logs} />
            </div>
        </BaseComponent>
    )
}

export default Logs
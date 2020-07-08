import React, { useState, useReducer, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { BaseComponent } from "components";
import CardContent from '@material-ui/core/CardContent';
// import { fetchEmpresas, registerEmpresa, deleteEmpresa } from "reduxState/ducks/empresa";
import { validate } from "utils";
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
            flexDirection: 'row',
            display: 'flex',

        },
    },
}));

const DashboardUser = ({ history }) => {
    let [state, setForm] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { nome: '', cnpj: '' })
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = React.useState([]);

    const classes = useStyles();
    let dispatch = useDispatch()


    return (
        <BaseComponent>

            {/* <RegisterEmpresaDialog errors={errors} submitForm={submitForm} setForm={setForm} open={open} onClose={_ => setOpen(false)} /> */}

            <div style={{ width: '100vw', height: '100vh' }}>

                <h1 style={{ textAlign: 'center', alignSelf: 'center', justifySelf: 'center' }}>Minhas empresas</h1>

            </div>
        </BaseComponent>
    )
}

export default DashboardUser


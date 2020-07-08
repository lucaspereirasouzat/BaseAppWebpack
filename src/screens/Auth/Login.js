import React, { useReducer, useState, useRef } from "react";
import { TextField, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login, verify } from "reduxState/ducks/auth";
import { useDispatch } from "react-redux";
import { validate } from "utils";
import BaseComponent from "components/BaseComponent";

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


const Login = ({ history }) => {
    let [state, setState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { email: '', password: '' })

    let passwordfield = useRef()

    let [errors, setErrors] = useState([])
    const classes = useStyles();
    let dispatch = useDispatch()


    const _login = async () => {

        let renamedFields = {
            email: 'Email',
            password: 'Senha'
        }
        let fields = validate(state, renamedFields);

        if (fields.length != 0) return setErrors(fields)

        try {
            let resutl = await dispatch(login(state))
            await dispatch(verify())
            history.push("/dashboard")
        } catch (error) {
            return setErrors(error)
        }
    }

    /**
     * Valida se o campo esta correto 
     * @param {} field 
     */
    const _isIncorrect = (field) => errors.some(v => v.field == field);

    /**
   * Valida se o campo esta correto e devolve a mensagem de erro
   * @param {} field 
   */
    const _isIncorrectMessage = (field) => errors.some(v => v.field == field) && errors.find(v => v.field == field).message

    let { email, password } = state;


    return (
        <BaseComponent>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>

                <form className={classes.root} autoComplete="on"
                    onSubmit={e => { e.preventDefault(); _login() }}
                >
                    <div style={{ width: 300 }}>
                        <TextField
                            id="filled-size-normal"
                            label="Login"
                            variant="filled"
                            value={email}
                            style={{ width: '100%' }}
                            error={_isIncorrect('email')}
                            helperText={_isIncorrectMessage('email')}
                            onSubmit={e => passwordfield.current.focus()}
                            onChange={e => setState({ email: e.target.value })} />
                    </div>

                    <div style={{ width: 300 }}>
                        <TextField
                            id="filled-basic"
                            label="Senha"
                            variant="filled"
                            type='password'
                            style={{ width: '100%' }}
                            inputRef={passwordfield}
                            value={password}
                            error={_isIncorrect('password')}
                            helperText={_isIncorrectMessage('password')}
                            onChange={e => setState({ password: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            variant="body2"
                            onClick={_ => history.push('./forgotPassword')} > Esqueceu a senha ?</Link>
                    </div>

                    <Button type={'submit'} onClick={_login} variant="contained" color="primary">
                        Logar
                </Button>

                    <Button type={'button'} onClick={_ => history.push('/signup')} variant="contained" color="primary">
                        Registrar
                </Button>
                </form>
            </div>
        </BaseComponent>
    )
}

export default Login
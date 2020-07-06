import React, { useReducer, useState, useRef } from "react";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login, verify } from "../../reduxState/ducks/auth";
import { useDispatch } from "react-redux";
import { validate } from "../../utils";
import BaseComponent from "../../components/BaseComponent";

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


const ForgotPassword = ({ history }) => {
    let [state, setState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { email: '' })

    let passwordfield = useRef()

    let [errors, setErrors] = useState([])
    const classes = useStyles();
    let dispatch = useDispatch()
    // let { user, error } = useSelector(({ auth }) => auth)

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
            history.push("/")
            console.log('deu certo', resutl);
        } catch (error) {
            console.log(error)
            return setErrors(error)
            alert(error)
            console.log(error);
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

    let { email } = state;
    return (

        <BaseComponent >
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
                <form className={classes.root} autoComplete="on"
                    onSubmit={e => { e.preventDefault(); _login() }}
                >
                    <div>
                        <TextField id="filled-basic"
                            label="E-Mail "
                            variant="filled"
                            value={email}
                            style={{ width: '100%' }}
                            error={_isIncorrect('email')}
                            helperText={_isIncorrectMessage('email')}
                            onSubmit={e => passwordfield.current.focus()}
                            onChange={e => setState({ email: e.target.value })} />
                    </div>


                    <Button type={'submit'} onClick={_login} variant="contained" color="primary">
                        Recuperar Senha
                </Button>


                </form>
            </div>
        </BaseComponent>
    )
}

export default ForgotPassword
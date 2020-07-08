import React, { useReducer, useState, useRef, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UpdateUserAdm } from "reduxState/ducks/users";
import { useDispatch } from "react-redux";
import { validate } from "utils";
import BaseComponent from "components/BaseComponent";

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

const App = ({ history, match }) => {
    let [state, setState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { email: '', password: '' })

    let emailfield = useRef()

    let [errors, setErrors] = useState([])
    const classes = useStyles();
    let dispatch = useDispatch();

    useEffect(() => { console.log(match.params.id) }, [])
    // let { user, error } = useSelector(({ auth }) => auth)

    const _login = async () => {

        let renamedFields = {
            username: 'Username',
            email: 'Email',
        }
        let fields = validate(state, renamedFields);

        if (fields.length != 0) return setErrors(fields)

        try {
            let resutl = await dispatch(UpdateUserAdm(state))
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

    let { username, email, image_id } = state;
    return (
        <BaseComponent>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
                <form className={classes.root} autoComplete="on"
                    onSubmit={e => { e.preventDefault(); _login() }}
                >

                    <img style={{ height: 'auto', width: 300 }} src={'http://localhost:3333/images/' + image_id} />
                    <div>

                        <TextField
                            id="filled-basic"
                            // label="Username"
                            variant="filled"
                            type='file'

                            //  value={file}
                            error={_isIncorrect('image')}
                            helperText={_isIncorrectMessage('image')}
                            onChange={e => setState({ image: e.target.files[0] })}
                        />
                    </div>

                    <div>

                        <TextField
                            id="filled-basic"
                            label="Username"
                            variant="filled"
                            type='username'
                            onSubmit={e => emailfield.current.focus()}
                            value={username}
                            error={_isIncorrect('username')}
                            helperText={_isIncorrectMessage('username')}
                            onChange={e => setState({ username: e.target.value })}
                        />
                    </div>

                    <div>
                        <TextField id="filled-basic"
                            label="E-mail"
                            variant="filled"
                            value={email}
                            inputRef={emailfield}
                            error={_isIncorrect('email')}
                            helperText={_isIncorrectMessage('email')}
                            onChange={e => setState({ email: e.target.value })} />
                    </div>

                    <Button type={'submit'} onClick={_login} variant="contained" color="primary">
                        Update
                </Button>
                </form>
            </div>
        </BaseComponent>
    )
}

export default App
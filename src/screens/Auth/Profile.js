import React, { useReducer, useState, useRef, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UpdateUser, verify } from "../../reduxState/ducks/auth";
import { useDispatch, useSelector } from "react-redux";
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

const Profile = () => {

    let [state, setState] = useReducer((prev, updated) => ({
        ...prev,
        ...updated,
    }), { Email: '', Username: '', file: {} })
    let { user } = useSelector(({ auth }) => auth)
    let emailfield = useRef()

    let [errors, setErrors] = useState([])
    const classes = useStyles();
    let dispatch = useDispatch();

    useEffect(() => { setState({ ...user }) }, [])


    const updateProfile = async () => {
        let renamedFields = {
            Username: 'Nome',
            Email: 'Email',
        }

        let fields = validate(state, renamedFields);
        if (fields.length != 0) return setErrors(fields)

        try {
            let resutl = await dispatch(UpdateUser(state))
            alert('Perfil editado com sucesso ')
            dispatch(verify())
        } catch (error) {
            console.log(error)
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

    let { Username, Email, FileID } = state;
    return (
        <BaseComponent>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
                <form className={classes.root} autoComplete="on"
                    onSubmit={e => { e.preventDefault(); updateProfile() }}
                >
                    {/* {
                        FileID.Valid && <img style={{ height: 'auto', width: 300 }} src={'http://localhost:3333/images/' + image_id + "?" + new Date().getTime()} />
                    } */}

                    <div>

                        <TextField
                            id="filled-basic"
                            // label="Username"
                            variant="filled"
                            type='file'
                            style={{ width: '100%' }}

                            //  value={file}
                            error={_isIncorrect('image')}
                            helperText={_isIncorrectMessage('image')}
                            onChange={e => setState({ image: e.target.files[0] })}
                        />
                    </div>

                    {/* <FormControlLabel
                        control={
                            <Switch checked={theme == 'dark'} onChange={e => dispatch(setTheme(e.target.checked ? 'dark' : 'light'))} value='dark' />
                        }
                        label={theme}
                    /> */}

                    <div>

                        <TextField
                            id="filled-basic"
                            label="Nome "
                            variant="filled"
                            type='username'
                            style={{ width: '100%' }}

                            onSubmit={e => emailfield.current.focus()}
                            value={Username}
                            error={_isIncorrect('Username')}
                            helperText={_isIncorrectMessage('Username')}
                            onChange={e => setState({ Username: e.target.value })}
                        />
                    </div>

                    <div>
                        <TextField id="filled-basic"
                            label="Email"
                            variant="filled"
                            value={Email}
                            style={{ width: '100%' }}

                            inputRef={emailfield}
                            error={_isIncorrect('Email')}
                            helperText={_isIncorrectMessage('Email')}
                            disable={"true"}
                            onChange={e => setState({ Email: e.target.value })} />
                    </div>

                    <Button type={'submit'}
                        //  onClick={updateProfile}
                        variant="contained" color="primary">
                        Atualizar
                </Button>
                </form>
            </div>
        </BaseComponent>
    )
}

export default Profile
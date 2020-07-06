import React, { useReducer, useState, useRef } from "react";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { register, verify } from "../../reduxState/ducks/auth";
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


const Signup = ({ history }) => {
  let [state, setState] = useReducer((prev, updated) => ({
    ...prev,
    ...updated,
  }), { username: '', email: '', password: '' })

  let passwordfield = useRef()
  let emailfield = useRef()

  let [errors, setErrors] = useState([])
  const classes = useStyles();
  let dispatch = useDispatch()
  // let { user, error } = useSelector(({ auth }) => auth)

  const _register = async () => {

    let renamedFields = {
      username: "Nome Completo",
      email: 'Email',
      password: 'Senha'
    }
    let fields = validate(state, renamedFields);

    if (fields.length != 0) return setErrors(fields)

    try {
      let resutl = await dispatch(register(state))
      await dispatch(verify())
      history.push("/")
    } catch (error) {
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

  let { email, password, username } = state;
  return (
    <BaseComponent>

      <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
        <form className={classes.root} autoComplete="on"
          onSubmit={e => { e.preventDefault(); _register() }}
        >
          <div>
            <TextField id="filled-basic"
              label="Nome"
              variant="filled"
              value={username}
              style={{ width: '100%' }}
              error={_isIncorrect('username')}
              helperText={_isIncorrectMessage('username')}
              onSubmit={e => emailfield.current.focus()}
              onChange={e => setState({ username: e.target.value })} />
          </div>
          <div>
            <TextField id="filled-basic"
              label="E-Mail"
              variant="filled"
              value={email}
              style={{ width: '100%' }}
              error={_isIncorrect('email')}
              helperText={_isIncorrectMessage('email')}
              onSubmit={e => passwordfield.current.focus()}
              inputRef={emailfield}
              onChange={e => setState({ email: e.target.value })} />
          </div>
          <div>

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


          <Button type={'submit'} onClick={_ => history.push('/signup')} variant="contained" color="primary">
            Registrar
                </Button>
        </form>
      </div>
    </BaseComponent>
  )
}

export default Signup
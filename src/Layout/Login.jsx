import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { Field, Form, Formik } from 'formik'
import { useStateValue } from '../store/stateProvider'
import { actionTypes } from '../store/reducer'
import { AiFillExperiment } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Login = () => {
  const [{ user }, dispatch] = useStateValue()
  const history = useHistory()

  return (
    <Container>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={(valores, actions) => {
          axios
            .post('https://peru-app-backend.herokuapp.com/api/login', valores)
            .then(response => {
              console.log('hola!!')
              localStorage.setItem('token', response.data.token)
              dispatch({
                type: actionTypes.CHANGE_USER,
                user: response
              })
              history.push('/')
            })
            .catch(err => {
              alert('contraseña o email invalidos')
              actions.resetForm({})
            })
        }}
        validate={valores => {
          let errors = {}
          if (!valores.email) {
            errors.email = 'por favor ingresa un correo'
          } else if (
            !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              valores.email
            )
          ) {
            errors.email =
              'el correo solo puede contener letras,numeros,puntos,guiones y guion bajo.'
          }
          if (!valores.password) {
            errors.password = 'por favor ingresa una contraseña'
          }
          return errors
        }}
      >
        {({ values, errors, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className=' bg-white d-flex flex-column justify-content-center p-3 rounded w-25-sm w-45'
            id='Form'
          >
            <Title>
              <AiFillExperiment />
              Entra a Peru Teams
            </Title>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Email:</label>
              <Field type='email' placeholder='Enter email' name='email' />
              {errors.email && (
                <Error
                  style={{ position: 'absolute', right: '10px', top: '10px' }}
                  className='alert alert-danger'
                  role='alert'
                >
                  {errors.email}
                </Error>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputPassword1'>Password:</label>
              <Field type='password' placeholder='Password' name='password' />
              {errors.password && (
                <Error
                  style={{ position: 'absolute', right: '10px', top: '10px' }}
                  role='alert'
                >
                  {errors.password}
                </Error>
              )}
            </div>
            <Link className='link-register' to='/register'>
              registrase
            </Link>
            <ButtonSubmit type='submit'>Entrar</ButtonSubmit>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
export default Login
const Error = styled.div`
  color: red;
  font-size: 0.6em;
  position: 'absolute';
  right: 10px;
  top: 10px;
`
const ButtonSubmit = styled.button`
  width: 100%;
  height: 35px;
  color: #11101d;
  background: #ffff00;
  border: none;
  border-radius: 1em;
  outline: none;
  :active {
    transform: scale(0.9);
  }
`
const Title = styled.h2`
  color: #11101d;
`
const Container = styled.div`
  .link-register {
    margin-bottom: 10px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    position: relative;
  }
  input {
    width: 100%;
  }
  width: 100%;
  margin-top: 6em;
  display: flex;
  align-items: center;
  #Form {
    padding: 1em;
    text-align: left;
    z-index: 1;
    background: white;
    h2 {
      text-align: center;
    }
    img {
      height: 50px;
      width: 100px;
      margin: 0 auto;
    }
    margin: 0 auto;
    width: 300px;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    @media (min-width: 320px) and(max-height:720px) {
      width: 60%;
    }
  }
`

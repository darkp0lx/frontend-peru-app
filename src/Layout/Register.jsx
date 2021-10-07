import axios from 'axios'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router'
import { useEffect, useState } from 'react'

import { rePhoneNumber } from '../helper/yup-phone'
import { useStateValue } from '../store/stateProvider'
import { actionTypes } from '../store/reducer'
import 'yup-phone'

const Perfil = () => {
  const history = useHistory()
  const [{ user }, dispatch] = useStateValue()
  const [userD, setUserD] = useState()

  useEffect(() => {
    axios
      .get('http://localhost:4002/api/users/615e6b498c7c014785cb251a')
      .then(res => console.log(res.data))
  }, [])
  return (
    <Container>
      <Formik
        initialValues={{
          names: '',
          lastNames: '',
          numberPhone: '',
          birthday: '',
          email: '',
          password: '',
          image: '',
          sede: '',
          cargo: ''
        }}
        onSubmit={(valores, actions) => {
          console.log('enviar')
          axios
            .post('http://localhost:4002/api/users', valores)
            .then(response => {
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
            errors.email = 'el correo solo puede contener letras,numeros.'
          }
          if (!valores.password) {
            errors.password = 'por favor ingresa una contraseña'
          } else if (!/^.{6,}$/.test(valores.password)) {
            errors.password = 'por favor ingresa almenos 6 caracteres'
          }

          if (!rePhoneNumber.test(valores.numberPhone)) {
            errors.numberPhone = 'el numero no es valido'
          }
          return errors
        }}
      >
        {({ values, errors, handleSubmit }) => (
          <Form id='Form' onSubmit={handleSubmit}>
            <h2>Registrate</h2>
            <div className='form-group'>
              <label>nombre:</label>
              <Field name='names' type='text' />
            </div>
            <div className='form-group'>
              <label>apellidos:</label>
              <Field name='lastNames' type='text' />
            </div>
            <div className='form-group'>
              <label>email:</label>
              <Field type='email' name='email' />
              {errors.email && (
                <Error
                  style={{ position: 'absolute', right: '0' }}
                  className='alert alert-danger'
                  role='alert'
                >
                  {errors.email}
                </Error>
              )}
            </div>
            <div className='form-group'>
              <label>password:</label>
              <Field type='password' name='password' />
            </div>
            <div className='form-group'>
              <label>photo de perfil:</label>
              <Field name='image' type='string' />
            </div>

            <div className='form-group'>
              <label>number Phone:</label>
              <Field name='numberPhone' type='number' />
              {errors.numberPhone && (
                <Error
                  style={{ position: 'absolute', right: '0' }}
                  className='alert alert-danger'
                  role='alert'
                >
                  {errors.numberPhone}
                </Error>
              )}
            </div>
            <div className='form-group'>
              <label>cargo:</label>
              <Field name='cargo' type='string' />
            </div>
            <div className='form-group'>
              <label>Sede:</label>
              <Field as='select' name='sede'>
                <option value='red'>Miraflores</option>
                <option value='green'>La Molina</option>
                <option value='blue'>San Isidro</option>
              </Field>
            </div>
            <button type='submit'>Registrarse</button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
export default Perfil
const Error = styled.div`
  color: red;
  font-size: 0.6em;
  position: 'absolute';
  right: 10px;
  top: 20px;
`

const Container = styled.div`
  .form-group {
    display: flex;
    margin: 10px 0;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
  }
  padding: 1em;
  border-radius: 0.5em;
  width: 60%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  margin-left: 20%;
  margin-top: 10%;
  padding-bottom: 2em;
  @media (min-width: 768px) {
    margin: 5% auto;
    width: 30%;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto;
  }
  h2 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    color: black;
    margin-top: 1em;
    width: 180px;
    background: rgb(238, 255, 0);
    border: none;
    border-radius: 0.5em;
    height: 25px;
    cursor: pointer;
    :active {
      transform: scale(0.9);
    }
  }
`

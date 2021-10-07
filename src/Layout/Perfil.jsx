import axios from 'axios'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import { rePhoneNumber } from '../helper/yup-phone'
import * as Yup from 'yup'
import 'yup-phone'
import { useStateValue } from '../store/stateProvider'

const Perfil = () => {
  const history = useHistory()

  const [{ user }, dispatch] = useStateValue()
  const [userNew, setUserNew] = useState()

  // validate any phone number (defaults to India for country)

  useEffect(() => {
    axios.get(`http://localhost:4002/api/users/${user.data.id}`).then(res => {
      setUserNew(res.data)
    })
  }, [user])
  return (
    <Container>
      {userNew && (
        <Formik
          initialValues={{
            names: userNew.names,
            lastNames: userNew.lastNames,
            numberPhone: userNew.numberPhone,
            birthday: userNew.birthday,
            email: userNew.email,
            image: userNew.image,
            sede: userNew.sede,
            cargo: userNew.cargo
          }}
          onSubmit={(valores, actions) => {
            console.log('enviar')
            axios
              .put(`http://localhost:4002/api/users/${user.data.id}`, valores)
              .then(response => {
                alert('exito al guardar')
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
            if (!rePhoneNumber.test(valores.numberPhone)) {
              errors.numberPhone = 'el numero no es valido'
            }
            return errors
          }}
        >
          {({ values, errors, handleSubmit }) => (
            <Form id='Form' onSubmit={handleSubmit}>
              <h2>Editar Perfil</h2>
              <img src='https://www.atlassian.com/es/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg' />
              <label>nombre:</label>
              <Field name='names' type='text' />
              <label>apellidos:</label>
              <Field name='lastNames' type='text' />
              <label>email:</label>
              <Field type='email' name='email' />
              {errors.email && (
                <div
                  style={{ position: 'absolute', right: '0' }}
                  className='alert alert-danger'
                  role='alert'
                >
                  {errors.email}
                </div>
              )}
              {errors.numberPhone && (
                <div
                  style={{ position: 'absolute', right: '0' }}
                  className='alert alert-danger'
                  role='alert'
                >
                  {errors.numberPhone}
                </div>
              )}
              <label>photo de perfil:</label>
              <Field name='image' type='string' />

              <label>cargo:</label>
              <Field name='cargo' type='string' />

              <label>birthday:</label>
              <Field name='birthday' type='text' />

              <label>number Phone:</label>
              <Field name='numberPhone' type='number' />

              <label>Sede:</label>
              <Field as='select' name='sede'>
                <option
                  value='Miraflores
'
                >
                  Miraflores
                </option>
                <option value='La Molina'>La Molina</option>
                <option value='San Isidro'>San Isidro</option>
              </Field>

              <button type='submit'>guardar</button>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  )
}
export default Perfil
const Container = styled.div`
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
    margin-top: 1em;
    width: 180px;
    background: green;
    color: white;
    border: none;
    border-radius: 0.5em;
    height: 25px;
    cursor: pointer;
    :active {
      transform: scale(0.9);
    }
  }
`

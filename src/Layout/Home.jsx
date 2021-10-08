import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GridTeam } from '../components/Team/GridTeam'
import axios from 'axios'

export const Home = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    axios
      .get('https://peru-app-backend.herokuapp.com/api/users')
      .then(res => setUsers(res.data))
  }, [])
  return (
    <Container>
      <h1>Este es el Home de nuestro Team</h1>
      <GridTeam users={users} />
    </Container>
  )
}

const Container = styled.div`
  margin-left: 12%;
  text-align: center;
  @media (min-width: 768px) {
    margin: 5%;
  }
`

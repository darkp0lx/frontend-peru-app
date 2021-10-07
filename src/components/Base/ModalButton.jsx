import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaAngleDown } from 'react-icons/fa'
import Modal from 'react-modal'
import styled from 'styled-components'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalButton = ({ user }) => {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal () {
    setIsOpen(true)
  }

  function closeModal () {
    setIsOpen(false)
  }

  return (
    <Component>
      <button onClick={openModal}>
        <FaAngleDown size={20} />
        ver Mas
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <button className='cerrar' onClick={closeModal}>
          x
        </button>
        <ModalContainer>
          <h2>nombre:{user.names}</h2>

          <img src={user.image} alt='' />
          <p>{user.description}</p>
          <p>email:{user.email}</p>
          <p>cargo:{user.cargo}</p>
          <p>sede:miraflores</p>
          <button>enviar mensaje</button>
        </ModalContainer>
      </Modal>
    </Component>
  )
}
const ModalContainer = styled.div`
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  button {
    width: 250px;
    margin: 0 auto;
    background: #11101d;
    color: white;
    border: none;
    height: 25px;
    border-radius: 10px;
  }
  @media (min-width: 768px) {
    button {
      width: 295px;
    }
  }
`
const Component = styled.div`
  button {
    border: none;
    height: 25px;
    background: #ffff00;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: rgba(136, 165, 191, 0.48) 3 2px 13 0px,
      rgba(255, 255, 255, 0.8) -3 -2px 16px 0px;
    outline: none;
    display: flex;
    align-items: center;
    :active {
      transform: scale(0.9);
    }
  }
`

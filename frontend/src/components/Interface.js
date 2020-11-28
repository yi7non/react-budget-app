import React from 'react'
import Form from './Form'
import Categories from './Categories'
import '../style/interface.css'

function Interface() {
  return (
    <div className="interface-container">
      <Categories />
      <Form />
    </div>
  )
}

export default Interface

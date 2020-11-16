import React from 'react'
import Form from './Form'
import Categories from './Categories'
import Salary from './Salary'
import '../style/interface.css'

function Interface() {
  return (
    <div className="interface-container">
      <div>
        <Salary />
      </div>
      <div>
        <Categories />
        <Form />
      </div>
    </div>
  )
}

export default Interface

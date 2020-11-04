import React, {useRef} from 'react'
import Form from './Form'
import Categories from './Categories'

function Interface() {
    const categoryInputRef = useRef(null)
    return (
        <div>
            <Categories ref={categoryInputRef}/>
            <Form ref={categoryInputRef}/>
        </div>
    )
}

export default Interface

import React, {useState, useContext} from 'react'
import {CategoriesContext} from '../App'

function Categories(props, ref) {
    
    const [text, setText] = useState('')
    const {dispatchCategories} = useContext(CategoriesContext)
    
    const addCategory = (e) => {
        e.preventDefault()
        dispatchCategories({type: 'ADD_CATEGORY', category: text})
        setText('')    
    }

    return (
        <form onSubmit={addCategory}>
           <input ref={ref} type="text" value={text} onChange={(e) => setText(e.target.value)}/>
           <button>הוסף</button> 
        </form>
    )
}

export default React.forwardRef(Categories)

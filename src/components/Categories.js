import React, {useState, useContext} from 'react'
import CategoriesContext from '../context/categories-context'

const Categories = () => {
    const [text, setText] = useState('')
    const {categoriesDispatch} = useContext(CategoriesContext)
    
    const addCategory = (e) => {
        e.preventDefault()
        categoriesDispatch({type: 'ADD_CATEGORY', category: text})
        setText('')    
    }

    return (
        <form onSubmit={addCategory}>
           <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
           <button>הוסף</button> 
        </form>
    )
}

export default Categories

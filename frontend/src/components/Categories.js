import React, {useState, useContext, useRef} from 'react'
import {CategoriesContext} from '../App'
import styled from 'styled-components'

const CatBtn = styled.button`
    line-height: 1.55;
    cursor: pointer;
    display: inline-block;
    padding: 0.7em 1.7em;
    margin: 0 0.3em 0.3em 0;
    border-radius: 0.2em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Rubik',sans-serif;
    font-weight: 100;
    color: #FFFFFF;
    border-color: #FFFFFF;
    box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
    text-align: center;
    position: relative;
    background-color: #026176;
`

function Categories() {

    const valueRef = useRef(null)
    
    const [text, setText] = useState('')
    const [formState, setFormState] = useState({x: '-161px', title: 'הוספת קטגוריה'})
    const {categories, dispatchCategories} = useContext(CategoriesContext)
    
    const addCategory = () => {
        const value = valueRef.current.value
        const categoryExist = categories.some(cat => cat === value)

        if (value && !categoryExist) {
            dispatchCategories({type: 'ADD_CATEGORY', category: text})
            setText('')
        }
        else {
            alert('לא הזנת קטגוריה חדשה 🥴🥴🥴')
            setText('')
        }
            
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (formState.title === 'הוספת קטגוריה') {
            setFormState({x: '0', title: 'הוסף'})
        }
        else {
            addCategory()
            setFormState({x: '-161px', title: 'הוספת קטגוריה'})
        }
    } 

    return (
        <form style={{transform: `translateX(${formState.x})`, transition: 'all .3s'}} onSubmit={handleSubmit}>
           <input ref={valueRef} style={{padding: '10px 0'}} type="text" value={text} onChange={(e) => setText(e.target.value)}/>
           <CatBtn>{formState.title}</CatBtn> 
        </form>
    )
}

export default Categories

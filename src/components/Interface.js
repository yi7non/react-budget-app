import React, {useState, useContext} from 'react'
import Select from './Select'
import Categories from './Categories'
import CategoriesContext from '../context/categories-context'
import BudgetContext from '../context/budget-context'

const Interface = () => {
    const types = ["תקציב", "הוצאות"]

    const {categories} = useContext(CategoriesContext)

    const [bType, setBtype] = useState('תקציב')
    let [category, setCategory] = useState()
    const [cost, setCost] = useState('')
    
    const {budget, budgetDispatch} = useContext(BudgetContext)
    const addBudget = (e) => {
        e.preventDefault()
        category = category ? category : e.target.querySelectorAll('select')[1].options[0].value

        const budgetExist = budget.some(obj => obj.category === category)
        console.log(budgetExist);
        if (budgetExist) {
            budgetDispatch({
                type: 'UPDATE_BUDGET', 
                budget: {bType, category, cost}
            })
        }

        budgetDispatch({
            type: 'ADD_BUDGET', 
            budget: {bType, category, cost}
        })
        setCost('')   
    }

    return (
        <div>
            <Categories/>
            <form onSubmit={addBudget}>
                <Select options={types} setState={setBtype} state={bType}/>
                {categories.length > 0 && <Select options={categories} setState={setCategory} state={category}/>}
                <input type="number" onChange={(e) => setCost(e.target.value)} value={cost} />
                <button>עדכן</button>
            </form>
        </div>
    )
}

export default Interface

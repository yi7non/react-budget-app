import React, { useState, useEffect, useContext, useRef } from 'react'
import { BudgetContext } from '../App'
import '../style/salary.css'

function Salary() {

    const { budget, dispatchBudget } = useContext(BudgetContext)
    const [salary, setSalary] = useState(0)
    const inputRef = useRef(null)
    const btnRef = useRef(null)

    useEffect(() => {
       const salaryIndex = budget.incomes.findIndex(income => income.category === 'salary')
       if (budget.incomes[salaryIndex]) {
           setSalary(budget.incomes[salaryIndex].cost)
        }
    }, [budget])

    const handleSubmit = e => {
        e.preventDefault()
        if (salary === 0) {
            alert('יש להזין משכורת קודם 🤣🤣🤣')
            return
        }
        inputRef.current.setAttribute('readonly', 'readonly')
        inputRef.current.style.fontSize = "20px"
        btnRef.current.style.display = "none"
        dispatchBudget({
            type: 'ADD_BUDGET', 
            budget: {bType: 'incomes', category: 'salary', cost: salary}
        })
    }
    return (
        <form onSubmit={handleSubmit} className="container salary">
            <div className="webflow-style-input">
                <input ref={inputRef} onChange={e => setSalary(e.target.value)} value={salary} type="text" placeholder="סכום משכורת חודשית"></input>
                <button ref={btnRef} type="submit"><i className="icon ion-android-arrow-forward"></i></button>
            </div>
        </form>
    )
}

export default Salary

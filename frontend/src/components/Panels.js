import React from 'react'
import ProgressBar from './ProgressBar'

const Panels = ({budget}) => {
    // remove salary from budget-array
    if (budget.incomes.length) {
        const salIndex = budget.incomes.findIndex(income => income.category === 'salary')
        budget.incomes.slice(salIndex, 1)
    }
    
    return (
        <div>
            {budget.incomes.length > 0 && budget.incomes.map(inc => {
             let percentage = 0   
             const expense = budget.expenses.find(exp => exp.category === inc.category)  
             if (expense) percentage = Math.round((expense.cost/inc.cost) * 100)
             const exp = expense ? expense.cost : 0
             return <ProgressBar key={inc.category} exp={exp} inc={inc} percentage={percentage}/>
            })}
        </div>
    )

}

export default Panels

import React from 'react'
import ProgressBar from './ProgressBar'

const Panels = ({budget}) => {
    
    // remove salary from budget-array
    const incomesItems = budget.incomes.filter(inc => inc.category !== 'salary')
    
    return (
        <div>
            {incomesItems.length > 0 && incomesItems.map(inc => {   
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

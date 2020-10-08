import React from 'react'
import ProgressBar from './ProgressBar'

const CategoriesIncomes = ({budget}) => {

    return (
        <div>
            {budget.income.length > 0 && budget.income.map(inc => {
             let percentage = 0   
             const expense = budget.expenses.find(exp => exp.category === inc.category)  
             if (expense) percentage = Math.round((expense.cost/inc.cost) * 100)
             const exp = (expense) ? expense.cost : 0
             return <ProgressBar key={inc.category} exp={exp} inc={inc} percentage={percentage}/>
            })}
        </div>
    )

}

export default CategoriesIncomes

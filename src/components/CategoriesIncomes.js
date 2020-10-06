import React from 'react'
import ProgressBar from './ProgressBar'

const CategoriesIncomes = ({budget}) => {
    console.log(budget);
    const expenses = budget.filter(obj => obj.bType === 'הוצאות')
    return (
        <div>
            {budget.filter(obj => obj.bType === 'תקציב').map(obj => {
               const subtraction = expenses.find(exp => exp.category === obj.category)
               let percentage = 100
               if(subtraction) {
                percentage = (subtraction / obj.cost) * 100
               }
               return <ProgressBar key={obj.category} data={obj} percentage={percentage}/>
            })}
        </div>
    )
}

export default CategoriesIncomes

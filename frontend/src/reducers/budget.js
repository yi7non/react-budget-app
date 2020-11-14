
import {salaryRemaining} from '../utility/utility.js'
export default (state, action) => {

    switch(action.type) {
        case 'POPULATE_BUDGET':
            return action.budget
            
        case 'ADD_BUDGET':
            const property = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
            const addState = {
                incomes: state.incomes.map(income => Object.assign({}, income)),
                expenses: state.expenses.map(expense => Object.assign({}, expense))
            }
            addState[property].push(action.budget)

            if (action.budget.category === 'salary') return addState

            // Calculation of salary remaining after current allocation
            salaryRemaining(addState.incomes)
            return addState
            
        case 'UPDATE_BUDGET':
            const updateProperty = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
            const index = state[updateProperty].findIndex(obj => obj.category === action.budget.category)
            const updateState = {
                incomes: state.incomes.map(income => Object.assign({}, income)),
                expenses: state.expenses.map(expense => Object.assign({}, expense))
            }
            
            updateState[updateProperty][index].cost = updateProperty === 'incomes' ? action.budget.cost : parseInt(updateState[updateProperty][index].cost) + parseInt(action.budget.cost)
            // Calculation of salary remaining after current allocation
            salaryRemaining(updateState.incomes)
            return updateState

        case 'DELETE_BUDGET':
            const deleteState = {
                incomes: state.incomes.filter(income => income.category !== action.budget),
                expenses: state.expenses.filter(expense => expense.category !== action.budget)
                }
            // Calculation of salary remaining after current allocation
            salaryRemaining(deleteState.incomes)    
            return deleteState
            
        default:
            return state
    }

}
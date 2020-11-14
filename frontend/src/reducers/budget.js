
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

            // Calculation of salary remaining after current allocation
            const salIndex = addState.incomes.findIndex(income => income.category === 'salary')
            const sal = addState.incomes.slice(salIndex, 1)
            const reduction = addState.incomes.reduce((accumulator, inc) => accumulator + inc.cost, 0)
            addState.incomes.push(sal)
            addState.incomes[addState.incomes.length - 1].cost -= reduction

            return addState
            
        case 'UPDATE_BUDGET':
            const updateProperty = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
            const index = state[updateProperty].findIndex(obj => obj.category === action.budget.category)
            const updateState = {
                incomes: state.incomes.map(income => Object.assign({}, income)),
                expenses: state.expenses.map(expense => Object.assign({}, expense))
            }
            
            updateState[updateProperty][index].cost = updateProperty === 'incomes' ? action.budget.cost : parseInt(updateState[updateProperty][index].cost) + parseInt(action.budget.cost)
            return updateState

        case 'DELETE_BUDGET':
            const deleteState = {
                incomes: state.incomes.filter(income => income.category !== action.budget),
                expenses: state.expenses.filter(expense => expense.category !== action.budget)
                }
            return deleteState
            
        default:
            return state
    }

}

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
            return addState
            
        case 'UPDATE_BUDGET':
            const updateProperty = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
            const index = state[updateProperty].findIndex(obj => obj.category === action.budget.category)
            const updateState = {
                incomes: state.incomes.map(income => Object.assign({}, income)),
                expenses: state.expenses.map(expense => Object.assign({}, expense))
            }
            updateState[updateProperty][index].cost = action.budget.cost
            return updateState
            
        default:
            return state
    }

}
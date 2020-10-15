
export default (state, action) => {
    
    switch(action.type) {
        case 'POPULATE_BUDGET':
            return action.budget
            
        case 'ADD_BUDGET':
            const property = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
            const addState = {...state}
            addState[property].push(action.budget)
            return addState
            
        case 'UPDATE_BUDGET':
            const updateProperty = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
            const index = state[updateProperty].findIndex(obj => obj.category === action.budget.category)
            const updateState = {...state}
            updateState[updateProperty][index].cost = parseInt(updateState[updateProperty][index].cost) + parseInt(action.budget.cost)
            return updateState
            
        default:
            return state
    }

}
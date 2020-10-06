export default (state, action) => {
    
    switch(action.type) {
        case 'POPULATE_BUDGET':
            console.log(action.budget);
            return action.budget
        case 'ADD_BUDGET':
            return state[action.bType].push(action.budget)
        case 'UPDATE_BUDGET':
        const index = state.findIndex(obj => obj.category === action.budget.category)
        return state.map((item, i) => {
            if (i === index) {
                item.cost = parseInt(item.cost) + parseInt(action.budget.cost)
                return item
            }
            return item
        })
        default:
            return state
    }

}
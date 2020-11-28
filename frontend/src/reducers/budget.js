export default (state, action) => {
  let salaryIndex
  switch (action.type) {
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
      salaryIndex = addState.incomes.findIndex(inc => inc.category === 'salary')
      addState.incomes[salaryIndex].cost -= action.budget.cost
      return addState

    case 'UPDATE_BUDGET':
      const updateProperty = action.budget.bType === 'הוצאות' ? 'expenses' : 'incomes'
      const index = state[updateProperty].findIndex(obj => obj.category === action.budget.category)
      const updateState = {
        incomes: state.incomes.map(income => Object.assign({}, income)),
        expenses: state.expenses.map(expense => Object.assign({}, expense))
      }

      updateState[updateProperty][index].cost =
        updateProperty === 'incomes'
          ? action.budget.cost
          : parseInt(updateState[updateProperty][index].cost) + parseInt(action.budget.cost)
      // Calculation of salary remaining after current allocation
      if (updateProperty === 'incomes') {
        salaryIndex = updateState.incomes.findIndex(inc => inc.category === 'salary')
        updateState.incomes[salaryIndex].cost += state.incomes[index].cost
        updateState.incomes[salaryIndex].cost -= action.budget.cost
      }
      return updateState

    case 'DELETE_BUDGET':
      let deleteState = {
        incomes: state.incomes.map(income => Object.assign({}, income)),
        expenses: state.expenses.map(expense => Object.assign({}, expense))
      }
      deleteState = {
        incomes: deleteState.incomes.filter(income => income.category !== action.budget),
        expenses: deleteState.expenses.filter(expense => expense.category !== action.budget)
      }
      // Calculation of salary remaining after current allocation
      salaryIndex = deleteState.incomes.findIndex(inc => inc.category === 'salary')
      deleteState.incomes[salaryIndex].cost += action.budget.cost
      return deleteState

    default:
      return state
  }
}

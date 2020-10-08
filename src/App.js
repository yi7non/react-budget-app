import React, {useReducer, useEffect} from 'react'
import Interface from './components/Interface'
import categoriesReducer from './reducers/categories'
import budgetReducer from './reducers/budget'
import CategoriesContext from './context/categories-context'
import BudgetContext from './context/budget-context'
import CategoriesIncomes from './components/CategoriesIncomes'

const App = () => {

  const [categories, categoriesDispatch] = useReducer(categoriesReducer, [])
  const [budget, budgetDispatch] = useReducer(budgetReducer, {income: [], expenses: []})

  useEffect(() => {

    const categories = JSON.parse(localStorage.getItem('categories'))
    if (categories) {
      categoriesDispatch({type: 'POPULATE_CATEGORIES', categories})
    }

    const budget = JSON.parse(localStorage.getItem('budget'))
    if (budget) {
      budgetDispatch({type: 'POPULATE_BUDGET', budget})
    }

  }, [])
 
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget))
  }, [budget])

  return (
    <BudgetContext.Provider value={{budget, budgetDispatch}}>
      <CategoriesContext.Provider value={{categories, categoriesDispatch}}>
        <CategoriesIncomes budget={budget} />
        <Interface/>
      </CategoriesContext.Provider>
    </BudgetContext.Provider> 
  )
}

export default App

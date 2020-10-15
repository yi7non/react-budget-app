import React, {useReducer, useEffect} from 'react'
import Interface from './components/Interface'
import categoriesReducer from './reducers/categories'
import budgetReducer from './reducers/budget'
import CategoriesContext from './context/categories-context'
import BudgetContext from './context/budget-context'
import CategoriesIncomes from './components/CategoriesIncomes'
// import { useQuery, gql } from '@apollo/client';


const App = () => {

  const [categories, categoriesDispatch] = useReducer(categoriesReducer, [])
  const [budget, budgetDispatch] = useReducer(budgetReducer, {income: [{bType: 'test', category: 'testcategory', cost: 0}], expenses: []})

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

  return (
    <BudgetContext.Provider value={{budget, budgetDispatch}}>
      <CategoriesContext.Provider value={{categories, categoriesDispatch}}>
        <Interface/>
        <CategoriesIncomes budget={budget} />
      </CategoriesContext.Provider>
    </BudgetContext.Provider> 
  )
}

export default App

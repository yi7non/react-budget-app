import React, {useReducer, useEffect} from 'react'
import Interface from './components/Interface'
import categoriesReducer from './reducers/categories'
import budgetReducer from './reducers/budget'
import CategoriesContext from './context/categories-context'
import BudgetContext from './context/budget-context'
import CategoriesIncomes from './components/CategoriesIncomes'
import { useQuery, gql } from '@apollo/client';

const POPULATE_BUDGET = gql`
  query populate_budget {
      incomes {
      bType
      category
      cost
    }
    expenses {
      bType
      category
      cost
    }
  }
`;

const App = () => {

  const [categories, categoriesDispatch] = useReducer(categoriesReducer, [])
  const [budget, budgetDispatch] = useReducer(budgetReducer)

  useEffect(() => {

    const categories = JSON.parse(localStorage.getItem('categories'))
    if (categories) {
      categoriesDispatch({type: 'POPULATE_CATEGORIES', categories})
    }

  }, [])
 
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  const { loading, error, data } = useQuery(POPULATE_BUDGET)

  let dispatched = false
  useEffect(() => {
    if (!dispatched && data) {
      const budget = data
      budgetDispatch({type: 'POPULATE_BUDGET', budget})
      dispatched = true
    }
  }, [data])

  if (loading) return <p>Loading ...</p>

  return (
    <BudgetContext.Provider value={{budget, budgetDispatch}}>
      <CategoriesContext.Provider value={{categories, categoriesDispatch}}>
        <Interface/>
        <CategoriesIncomes budget={data} />
      </CategoriesContext.Provider>
    </BudgetContext.Provider> 
  )
}

export default App

import React, { useReducer, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import categoriesReducer from './reducers/categories'
import budgetReducer from './reducers/budget'
import Salary from './components/Salary'
import Interface from './components/Interface'
import Panels from './components/Panels'

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
`

export const BudgetContext = React.createContext()
export const CategoriesContext = React.createContext()

function App() {
  const [categories, dispatchCategories] = useReducer(categoriesReducer, [])
  const [budget, dispatchBudget] = useReducer(budgetReducer, { incomes: [], expenses: [] })

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories'))
    if (categories) {
      dispatchCategories({ type: 'POPULATE_CATEGORIES', categories })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  const { loading, data } = useQuery(POPULATE_BUDGET)

  useEffect(() => {
    let dispatched = false
    if (!dispatched && data) {
      dispatchBudget({ type: 'POPULATE_BUDGET', budget: data })
      dispatched = true
    }
  }, [data])

  if (loading) return <p style={{ fontSize: '40px' }}>Loading ...</p>

  return (
    <BudgetContext.Provider value={{ budget, dispatchBudget }}>
      <CategoriesContext.Provider value={{ categories, dispatchCategories }}>
        <Salary budget={budget} dispatchBudget={dispatchBudget} />
        <Interface />
        <Panels budget={budget} />
      </CategoriesContext.Provider>
    </BudgetContext.Provider>
  )
}

export default App

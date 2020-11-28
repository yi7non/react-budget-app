import React, { useState, useEffect, useRef } from 'react'
import { useMutation, gql } from '@apollo/client'
import '../style/salary.css'

const ADD_INCOMES = gql`
  mutation createIncome($data: IncomeCreateInput!) {
    createIncome(data: $data) {
      bType
      category
      cost
    }
  }
`

function Salary({ budget, dispatchBudget }) {
  const [createIncome] = useMutation(ADD_INCOMES)

  const [salary, setSalary] = useState()
  const inputRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const salaryIndex = budget.incomes.findIndex(income => income.category === 'salary')
    if (budget.incomes[salaryIndex]) {
      setSalary(budget.incomes[salaryIndex].cost)
      handleSalaryStyle()
    }
  }, [budget.incomes])

  const handleSalaryStyle = () => {
    inputRef.current.setAttribute('readonly', 'readonly')
    inputRef.current.style.fontSize = '24px'
    inputRef.current.style.textAlign = 'center'
    btnRef.current.style.display = 'none'
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (salary === 0) {
      alert('יש להזין משכורת קודם 🤣🤣🤣')
      return
    }

    handleSalaryStyle()

    dispatchBudget({
      type: 'ADD_BUDGET',
      budget: { bType: 'תקציב', category: 'salary', cost: salary }
    })

    createIncome({
      variables: {
        data: { bType: 'תקציב', category: 'salary', cost: salary }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="container salary">
      <div className="webflow-style-input">
        <input
          ref={inputRef}
          onChange={e => setSalary(e.target.value)}
          value={salary}
          type="text"
          placeholder="סכום משכורת חודשית"
        />
        <button ref={btnRef} type="submit">
          <i className="icon ion-android-arrow-forward"></i>
        </button>
      </div>
    </form>
  )
}

export default Salary

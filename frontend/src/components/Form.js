import React, { useState, useContext, useRef } from 'react'
import { useMutation, gql } from '@apollo/client'
import styled from 'styled-components'
import { CategoriesContext } from '../App'
import { BudgetContext } from '../App'
import Select from './Select'

const ADD_INCOMES = gql`
  mutation createIncome($data: IncomeCreateInput!) {
    createIncome(data: $data) {
      bType
      category
      cost
    }
  }
`
const ADD_EXPENSES = gql`
  mutation createExpense($data: ExpenseCreateInput!) {
    createExpense(data: $data) {
      bType
      category
      cost
    }
  }
`
const UPDATE_INCOMES = gql`
  mutation updateIncome($data: IncomeUpdateInput!, $where: IncomeWhereUniqueInput!) {
    updateIncome(data: $data, where: $where) {
      bType
      category
      cost
    }
  }
`

const FormElement = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #026176;
  height: 65px;
  border-top: 1px solid #00242c;
  border-bottom: 1px solid #00242c;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px -5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px -3px 14px 2px rgba(0, 0, 0, 0.12);
  &:hover {
    transform: translateY(2px) scale(1.005);
    box-shadow: 0px -5px 7px 1px rgba(0, 0, 0, 0.2), 0px 8px 13px 1px rgba(0, 0, 0, 0.14),
      0px -3px 5px 2px rgba(0, 0, 0, 0.12);
  }
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`
const Input = styled.input`
  outline: none;
  height: 55%;
  width: 100px;
  @media (max-width: 768px) {
    width: 30%;
  }
  text-align: left;
  font-size: 20px;
  font-family: 'Rubik', sans-serif;
  font-weight: inherit;
  padding: 0;
  margin-right: 0;
`
export const Button = styled.button`
  font-size: ${props => props.height || '40px'};
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.1;
  transition: all 0.4s;
  &:hover {
    color: ${props => (props.bType === 'תקציב' ? 'lime' : 'red')};
  }
  @media (max-width: 768px) {
    padding-right: 0;
  }
`

function Form() {
  const categoryRef = useRef(null)

  const [createIncome] = useMutation(ADD_INCOMES)
  const [updateIncome] = useMutation(UPDATE_INCOMES)
  const [createExpense] = useMutation(ADD_EXPENSES)

  const [bType, setbType] = useState('תקציב')
  let [category, setCategory] = useState('')
  const [cost, setCost] = useState('')

  const { budget, dispatchBudget } = useContext(BudgetContext)
  const { categories } = useContext(CategoriesContext)

  const addBudget = e => {
    e.preventDefault()
    const salaryIndex = budget.incomes.findIndex(inc => inc.category === 'salary')
    if (salaryIndex < 0) {
      alert('יש להזין קודם משכורת🤑')
      setCost('')
      return
    }
    if (parseInt(budget.incomes[salaryIndex].cost) - parseInt(cost) < 0) {
      alert('אין לך את הסכום הזה בחשבון')
      setCost('')
      return
    }
    category = category ? category : categoryRef.current.value
    const property = bType === 'תקציב' ? 'incomes' : 'expenses'
    const budgetExist = budget[property].some(prop => prop.category === category)
    // if budget allredy exist run update else run add
    if (budgetExist) {
      dispatchBudget({
        type: 'UPDATE_BUDGET',
        budget: { bType, category, cost }
      })

      if (property === 'incomes') {
        updateIncome({
          variables: {
            data: { bType, cost },
            where: { category }
          }
        })
      } else {
        //the createExpense resolver on gql backend handle both situation
        // create expense and update expense, all logic for that exist in there
        createExpense({
          variables: {
            data: { bType, category, cost }
          }
        })
      }

      // this else handle case of new budget
    } else {
      dispatchBudget({
        type: 'ADD_BUDGET',
        budget: { bType, category, cost }
      })

      if (property === 'incomes') {
        createIncome({
          variables: {
            data: { bType, category, cost }
          }
        })
        // for update salary We need to deduct from the general salary the current income
        const salaryDataUpdate = parseInt(budget.incomes[salaryIndex].cost) - parseInt(cost)
        updateIncome({
          variables: {
            data: { cost: salaryDataUpdate },
            where: { category: 'salary' }
          }
        })
      } else {
        createExpense({
          variables: {
            data: { bType, category, cost }
          }
        })
      }
    }

    setCost('')
  }

  return (
    <FormElement onSubmit={addBudget}>
      <Select options={['תקציב', 'הוצאות']} setState={setbType} state={bType} />
      {categories.length > 0 && (
        <Select ref={categoryRef} options={categories} setState={setCategory} state={category} />
      )}
      <Input type="number" onChange={e => setCost(e.target.value)} value={cost} />
      <Button bType={bType}>
        <i className="ion-ios-checkmark-outline"></i>
      </Button>
    </FormElement>
  )
}

export default Form

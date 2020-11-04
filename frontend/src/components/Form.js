import React, { useState, useContext } from 'react'
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components'
import { CategoriesContext } from '../App'
import { BudgetContext } from '../App' 
import Select from './Select'
import categoryInputRef from './Categories'

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
    transition: all .3s ease-in-out;
    box-shadow: 0px -5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px -3px 14px 2px rgba(0,0,0,0.12);
    &:hover {
        transform: translateY(2px) scale(1.005);
        box-shadow: 0px -5px 7px 1px rgba(0,0,0,0.2), 0px 8px 13px 1px rgba(0,0,0,0.14), 0px -3px 5px 2px rgba(0,0,0,0.12);
    }
`
const Input = styled.input`
    outline: none;
    height: 50%;
    width: 100px;
    text-align: left;
    font-size: 20px;
    font-family: 'Rubik',sans-serif;
    font-weight: inherit;
    padding: 0;
    margin-right: 0;
`
export const Button = styled.button`
    font-size: ${props => props.height || '40px'};
    background: none;
    border: none;
    color: #FFF;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.1;
    margin-left: 10px;
    transition: all .4s;
    &:hover {
        color: ${props => props.bType === 'תקציב' ? 'lime' : 'red'};
    }
`

function Form(props, ref) {
    
    const [bType, setBtype] = useState('תקציב')
    let [category, setCategory] = useState('')
    const [cost, setCost] = useState('')

    const [createIncome] = useMutation(ADD_INCOMES)
    const [updateIncome] = useMutation(UPDATE_INCOMES)
    const [createExpense] = useMutation(ADD_EXPENSES)
    
    const {budget, dispachBudget} = useContext(BudgetContext)
    const {categories} = useContext(CategoriesContext)

    const addBudget = (e) => {
        e.preventDefault()
        // category = category ? category : e.target.querySelectorAll('select')[1].options[0].value
        category = category ? category : ref.current.value
        const property = bType === 'תקציב' ? 'incomes' : 'expenses'
        const budgetExist = budget[property].some(obj => obj.category === category)
    
        if (budgetExist) {
            
            dispachBudget({
                type: 'UPDATE_BUDGET', 
                budget: {bType, category, cost}
            })

            updateIncome({variables: {
                data: {bType, cost},
                where: {category}
            }})

        }
        
        else {    
            dispachBudget({
                type: 'ADD_BUDGET', 
                budget: {bType, category, cost}
            })

            if (property === 'incomes') {
                createIncome({variables: {
                    data: {bType, category, cost}
                }})
            } else {
                createExpense({variables: {
                    data: {bType, category, cost}
                }})
            }
             
        }

        setCost('')   
    }

    return (
        <FormElement onSubmit={addBudget} style={{marginTop: "160px", marginBottom: '60px'}}>
            <Select options={["תקציב", "הוצאות"]} setState={setBtype} state={bType}/>
            {categories.length > 0 && <Select options={categories} setState={setCategory} state={category}/>}
            <Input type="number" onChange={(e) => setCost(e.target.value)} value={cost} />
            <Button bType={bType}><i className="ion-ios-checkmark-outline"></i></Button>
        </FormElement>
    )
}

export default React.forwardRef(Form)

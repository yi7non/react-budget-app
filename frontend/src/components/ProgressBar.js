import React, { useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { BudgetContext } from '../App'
import styled from 'styled-components'
import { Button } from './Form'

const Flex = styled.div`
  display: flex;
  font-family: 'Rubik', sans-serif;
  background-color: #026176;
  margin: 10px auto;
  padding: 0;
  color: #fff;
  width: ${props => (props.width ? props.width : 'auto')};
  height: 35px;
  @media (min-width: 426px) {
    height: 45px;
    padding: 0 10px;
    max-width: ${props => (props.mw ? '70%' : 'none')};
  }
  transition: opacity 0.4s ease-in-out;
  &.text-container {
    transform: translateX(22px);
    background-color: transparent;
    transition: all 0.7s ease;
  }
  &.progress-bar:hover .text-container {
    transform: translateX(0);
  }
  &.progress-bar:hover span {
    transition: all 0.9 ease-in-out;
    visibility: visible;
    opacity: 1;
  }
`
const Total = styled.div`
  padding-right: 0;
  font-size: 12px;
  @media (min-width: 426px) {
    padding-right: 5px;
    font-size: 16px;
  }
  background-color: ${props => props.bg};
  color: ${props => props.color};
`
const Progress = styled.div`
  direction: rtl;
  width: 100%;
  background-color: #d1cdcd;
  font-size: 15px;
  line-height: 2.3;
  @media (min-width: 426px) {
    line-height: 2.6;
    font-size: 18px;
  }
  text-align: center;
  position: relative;
  &::after {
    position: absolute;
    transform: translateX(50%);
    top: 0;
    color: #fff;
    right: ${props => 100 - props.width + props.width / 2}%;
    content: '${props => props.text > 0 && '₪' + props.text}';
    transition: all 0.7s ease-out;
  }
`
const Bar = styled.div`
  direction: rtl;
  width: ${props => 100 - props.width}%;
  height: 100%;
  background-color: #06d506;
  color: #fff;
  transition: all 0.7s ease-out;
`
const SPAN = styled.span`
  transform: translateX(10px);
  visibility: hidden;
  opacity: 0;
  transition: all 0.9 ease-in-out;
`
const DELETE_INCOME = gql`
  mutation deleteIncome($where: IncomeWhereUniqueInput!) {
    deleteIncome(where: $where) {
      category
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

function ProgressBar({ inc, exp, percentage }) {
  const [deleteIncom] = useMutation(DELETE_INCOME)
  const [updateIncome] = useMutation(UPDATE_INCOMES)

  const { budget, dispatchBudget } = useContext(BudgetContext)

  const salaryIndex = budget.incomes.findIndex(inc => inc.category === 'salary')
  const salaryDataUpdate = parseInt(budget.incomes[salaryIndex].cost) + parseInt(inc.cost)

  const del = category => {
    dispatchBudget({
      type: 'DELETE_BUDGET',
      budget: category
    })
    deleteIncom({
      variables: {
        where: { category }
      }
    })
    updateIncome({
      variables: {
        data: { cost: salaryDataUpdate },
        where: { category: 'salary' }
      }
    })
  }

  const handleMouseOver = e => {
    console.log(inc.cost)
    document.querySelectorAll('.progress-bar').forEach(pb => (pb.style.opacity = '.5'))
    e.target.closest('.progress-bar').style.opacity = '1'
  }

  const handleMouseLeave = () => {
    document.querySelectorAll('.progress-bar').forEach(pb => (pb.style.opacity = '1'))
  }

  const btnEffect = {
    width: 'auto',
    maxWidth: '0',
    opacity: '0',
    visibility: 'hidden'
  }
  return (
    <Flex
      mw={true}
      className="progress-bar"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <Button style={btnEffect} height="20px">
        <i className="ion-ios-refresh-outline"></i>
      </Button>
      <Progress width={percentage} text={exp}>
        <Bar width={percentage}>₪{inc.cost - exp}</Bar>
      </Progress>
      <Flex className="text-container" width="135px">
        <Total>₪{inc.cost}</Total>
        <Total>{inc.category}</Total>
        <SPAN>
          <Button onClick={() => del(inc.category)} height="20px">
            <i className="ion-ios-close-outline"></i>
          </Button>
        </SPAN>
      </Flex>
    </Flex>
  )
}

export default ProgressBar

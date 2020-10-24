import React, {useContext} from 'react'
import { useMutation, gql } from '@apollo/client';
import BudgetContext from '../context/budget-context'
import styled from 'styled-components'
import {Button} from './Interface'

const Flex = styled.div`
    display: flex;
    font-family: 'Rubik', sans-serif;
    background-color: #026176;
    margin: 10px auto;
    padding: 0 10px;
    color: #FFF;
    width: ${props => props.width ? props.width : 'auto'};
    max-width: ${props => props.mw ? '70%' : 'none'};
    transition: opacity .4s ease-in-out;
    &.text-container {
        transform: translateX(45px);
        background-color: transparent;
        transition: all .7s ease;
    }
    &.progress-bar:hover .text-container {
        transform: translateX(0);
    }
    &.progress-bar:hover span {
        transition: all .9 ease-in-out;
        visibility: visible;
        opacity: 1;
    }
`
const Total = styled.div`
    background-color: ${props => props.bg};
    color: ${props => props.color};
`
const Progress = styled.div`
    direction: rtl;
    width: 100%;
    background-color: #d1cdcd;
    font-size: 18px;
    line-height: 2;    
    text-align: center;
    position: relative;
    &::after{
        position: absolute;
        transform: translateX(50%);
        top: 0;
        color: #FFF;
        right: ${props => (100 - props.width + props.width/2)}%;
        content: '${props => (props.text > 0) && '₪' + props.text}';
        transition: all .7s ease-out; 
    }
`
const Bar = styled.div`
    direction: rtl;
    width: ${props => (100 - props.width)}%;
    height: 100%;
    background-color: #06d506;
    color: #FFF;
    transition: all .7s ease-out;
`
const SPAN = styled.span`
    transform: translateX(10px);
    visibility: hidden;
    opacity: 0;
    transition: all .9 ease-in-out;
`
const DELETE_INCOME = gql`
mutation deleteIncome($where:  IncomeWhereUniqueInput!) {
    deleteIncome(where: $where) {
        category
    }
}
`
const ProgressBar = ({inc, exp, percentage}) => {

    const [deleteIncom] = useMutation(DELETE_INCOME)
    const {budgetDispatch} = useContext(BudgetContext)

    const del = category => {
        budgetDispatch({
            type: 'DELETE_BUDGET', 
            budget: category
        })
        deleteIncom({variables: {
        where: {category}
    }}
    )}

    const handleMouseOver = (e) => {
         document.querySelectorAll('.progress-bar').forEach(pb => pb.style.opacity = ".5")
         e.target.closest('.progress-bar').style.opacity = '1'
    }
    const handleMouseLeave = () => {
        document.querySelectorAll('.progress-bar').forEach(pb => pb.style.opacity = "1")  
    }

    const btnEffect = {
        width: 'auto',
        maxWidth: '0',
        opacity: '0',
        visibility: 'hidden',
    }
    return (
        <Flex mw={true} className="progress-bar" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <Button style={btnEffect} height='20px'><i className="ion-ios-refresh-outline"></i></Button>
            <Progress width={percentage} text={exp}>
                <Bar width={percentage}>₪{inc.cost - exp}</Bar>
            </Progress>
            <Flex className="text-container" width="135px">
                <Total>&nbsp;₪{inc.cost}</Total>&nbsp;<Total>{inc.category}</Total>
                <SPAN><Button onClick={()=> del(inc.category)} height='20px'><i className="ion-ios-close-outline"></i></Button></SPAN>
            </Flex>
        </Flex>
    )
}

export default ProgressBar

import React from 'react'
import styled from 'styled-components'

const Flex = styled.div`
    display: flex;
    font-family: 'Rubik', sans-serif;
    background-color: #026176;
    margin: 10px auto;
    padding: 0 10px;
    color: #FFF;
    width: ${props => props.width ? props.width : 'auto'}
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
        content: '₪${props => props.text}';
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

const ProgressBar = ({inc, exp, percentage}) => {
    console.log(percentage)
    return (
        <Flex>
            <Progress width={percentage} text={exp}>
                <Bar width={percentage}>₪{inc.cost - exp}</Bar>
            </Progress>
            <Flex width="115px">
                <Total>&nbsp;₪{inc.cost}</Total>&nbsp;<Total>{inc.category}</Total>
            </Flex>
        </Flex>
    )
}

export default ProgressBar

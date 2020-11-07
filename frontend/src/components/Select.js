import React from 'react'
import styled from 'styled-components'

const MySelect = styled.select`
    outline: none;
    height: 56%;
    width: 100px;
    text-align: left;
    font-size: 20px;
    font-family: 'Rubik', sans-serif;
    font-weight: inherit;
    color: ${props => {
        switch(props.value) {
            case 'תקציב':
                return '#06d506'
            case 'הוצאות':
                return ' #d50606'
            default:
                return '#333'
        }
    }};
    & * {
        font-weight: inherit; 
    }
    padding-left: 15px;
    margin-right: 10px;
`

const Select = ({options, state, setState}, ref) => {
    return (
        <MySelect ref={ref} onChange={(e) => setState(e.target.value)} value={state}>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </MySelect>
    )
}

export default React.forwardRef(Select) 

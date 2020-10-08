import React from 'react'
import styled from 'styled-components'

const MySelect = styled.select`
    outline: none;
    height: 100%;
    width: 100px;
    text-align: left;
    font-size: 20px;
    font-family: 'Rubik', sans-serif;
    font-weight: inherit;
    & * {
        font-weight: inherit; 
    }
    padding-left: 15px;
    margin-right: 10px;
`

const Select = ({options, state, setState}) => {
    return (
        <MySelect onChange={(e) => setState(e.target.value)} value={state}>
            {options.map(option => <option value={option}>{option}</option>)}
        </MySelect>
    )
}

export default Select

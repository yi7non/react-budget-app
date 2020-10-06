import React from 'react'

const Select = ({options, state, setState}) => {
    return (
        <select onChange={(e) => setState(e.target.value)} value={state}>
            {options.map(option => <option value={option}>{option}</option>)}
        </select>
    )
}

export default Select

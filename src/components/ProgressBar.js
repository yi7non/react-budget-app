import React from 'react'
import styled from 'styled-components'

const Progress = styled.div`
    direction: rtl;
    width: 100%;
    background-color: #b0aeae;
    margin: 2px 0;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 18px;    
    text-align: center;
`
const Bar = styled.div`
    direction: rtl;
    width: 90%;
    height: 30px;
    background-color: #04be04;
    color: #FFF;
`

const ProgressBar = ({data, percentage}) => {
    console.log(percentage);
    return (
        <Progress>
            <Bar>{data.category}: {data.cost} -- {percentage}%</Bar>
        </Progress>
    )
}

export default ProgressBar

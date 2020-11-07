import React, { useState } from 'react'
import '../style/salary.css'

function Salary() {
    const [salary, setSalary] = useState('');
    return (
        <div className="container salary">
            <div className="webflow-style-input">
                <input onChange={e => setSalary(e.target.value)} value={salary} type="text" placeholder="סכום משכורת חודשית"></input>
                <button type="submit"><i className="icon ion-android-arrow-forward"></i></button>
            </div>
        </div>
        
    )
}

export default Salary

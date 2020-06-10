import React from 'react';

const options = [  
    {title: 'Male'},
    {title: 'Female'},
    {title: 'Not sure'},
]


export default function SelectDropDown({handleSelect}){
   

    return(
        <select onChange={handleSelect}>
            <option selected disabled>Select your gender herer</option>
            {options.map(option => (
                <option 
                   key={option.title}
                >
                    {option.title}
                    
                </option>
            ))}
        </select>
        
    )
}
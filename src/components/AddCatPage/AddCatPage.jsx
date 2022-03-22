import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';




function AddCatPage() {
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Add your cat');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [neutered, setNeutered] = useState(''); 
    const [weight, setWeight] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        event.preventDefault();
        console.log('in add cat handleSubmit');
        const newCat = {
            name: name,
            age: age,
            is_neutered: neutered,
            current_weight: weight
        };
        console.log('newCat is', newCat);
        const confirmation = confirm("Do you want to add this cat?")
        if(confirmation === true) {
        dispatch({type: 'ADD_CAT', payload: newCat})
        setName('');
        setAge('');
        setNeutered('');
        setWeight('');
        alert(`${newCat.name} is added!`)
        } 
        
    }

    const handleClick = () => {
        history.push("/user-home");
    }
    
  
    return (
       <div className="container">
           <h1>{heading}</h1>
           <form onSubmit={handleSubmit}>
           <label> Name:
               <input type="text" 
                      placeholder="name" 
                      name="name"
                      value={name}
                      onChange={event => setName(event.target.value)}
                      />
           </label><br></br>
           <label>Age:
            <select 
                name="age"
                value={age}
                onChange={event => setAge(event.target.value)}
            >
                <option value="none">Select from options</option>
                <option value="kitten">Kitten</option>
                <option value="adult">Adult</option>
            </select>
           </label><br></br>    
           <label>Neutered?
            <select 
                name="neuter-status"
                value={neutered}
                onChange={event => setNeutered(event.target.value)}
            > 
                <option value="none">Select from options</option>
                <option value="neutered">Neutered</option>
                <option value="intact">Intact</option>
            </select>
           </label> <br></br>
           <label> Weight:
               <input type="number" 
                      placeholder="weight" 
                      name="weight"
                      value={weight}
                      onChange={event => setWeight(event.target.value)}
                      />
           </label><br></br>
           <button type="submit">Add</button>
        </form>
            <button onClick={handleClick}>Back</button>
      
            
        </div>
    );
}

export default AddCatPage;

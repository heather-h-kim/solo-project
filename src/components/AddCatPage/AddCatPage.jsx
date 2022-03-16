import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



function AddCatPage() {
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Add your cat');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [neutered, setNeutered] = useState(''); 
    const [weight, setWeight] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in add cat handleSubmit');
        const newCat = {
            name: name,
            age: age,
            is_neutered: neutered,
            current_weight: weight
        };

        console.log('newCat is', newCat);
        dispatch({type: 'ADD_CAT', payload: newCat})
        setName('');
        setAge('');
        setNeutered('');
        setWeight('');
    }
    
  
    return (
       <div className="container">
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
        </div>
    );
}

export default AddCatPage;

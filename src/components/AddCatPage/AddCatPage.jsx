import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



function AddCatPage() {
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Add your cat');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [neutered, setNeutered] = useState(''); 
    const [weight, setWeight] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in add cat handleSubmit');
        const is_neutered = (/true/i).test(neutered);
        console.log('is_neutered is', is_neutered);

        const newCat = {
            name: name,
            age: age,
            is_neutered: is_neutered,
            current_weight: weight
        };

        console.log('newCat is', newCat);
        
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
            </select><br></br>
           </label>    
           <label>Neutered?
            <select 
                name="neuter-status"
                value={neutered}
                onChange={event => setNeutered(event.target.value)}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
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

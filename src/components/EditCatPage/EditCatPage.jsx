import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function EditCatPage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Add your cat');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [neutered, setNeutered] = useState('');
  const [weight, setWeight] = useState('');
  const dispatch = useDispatch();
  const thisCat = store.thisCat;



  return (
    <div className="container">
      <p>Edit info</p>
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

export default EditCatPage;

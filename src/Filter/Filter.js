import React from 'react';
import s from '../Filter/Filter.module.css';

const Filter = ({ value, OnFilterContacts }) => (
  <>
    <label>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={OnFilterContacts}
        placeholder=" Fined contacts by name"
      ></input>
    </label>
  </>
);

export default Filter;

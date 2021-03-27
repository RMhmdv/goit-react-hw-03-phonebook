import React from 'react';
import s from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, ondeleteContact }) => {
  return (
    <>
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li className={s.item} key={id}>
            <span className={s.text}>{name}: </span>
            <span className={s.text}>{number}</span>
            <button className={s.btn} onClick={() => ondeleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;

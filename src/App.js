import React, { Component } from 'react';
import { v1 as uuidv4 } from 'uuid';
import s from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import contactsData from './components/ContactsData/contacts.json';

class App extends Component {
  state = {
    contacts: contactsData,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;

    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact));
    }
  }

  formSubmitHandler = data => {
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase(),
      )
    ) {
      alert(`${data.name} is already in your contacts!`);
    } else if (
      this.state.contacts.find(({ number }) => number === data.number)
    ) {
      alert(`${data.name} is already in your contacts!`);
    // } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(data.number)) {
    //   alert(`Enter valid number please`);
    } else {
      data.id = uuidv4();
      this.setState(({ contacts }) => ({
        contacts: [data, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase()),
    );
  };

  render() {
    const contacts = this.filterContactsByName();

    return (
      <div className={s.wrap}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm OnSaveContacts={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          OnFilterContacts={this.handleChangeFilter}
        />
        <ContactList contacts={contacts} ondeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;

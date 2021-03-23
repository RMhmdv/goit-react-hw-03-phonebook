import React, { Component } from "react";
import { v1 as uuidv1 } from "uuid";
import s from "./App.module.css";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import PropTypes from "prop-types";

class App extends Component {
  static defaultProps = {
    contacts: [],
    name: "",
    number: "",
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ),
  };

  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const getContacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(getContacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = (data) => {
    const myContacts = {
      id: uuidv1(),
      name: data.name,
      number: data.number,
    };

    //проверяем дублируется контакт или нет при добавлении
    const getContacts = this.state.contacts.map((contact) =>
      contact.name.toLocaleLowerCase()
    );

    const isGetContactAlready = getContacts.includes(
      data.name.toLocaleLowerCase()
    );

    if (isGetContactAlready) {
      alert(`${data.name} is already in contacts!`);
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, myContacts],
        };
      });
    }
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  handleChangeFilter = (e) => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  filterContactsByName = () => {
    return this.state.contacts.filter((contact) =>
      contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );
  };

  render() {
    const contacts = this.filterContactsByName();

    return (
      <div className={s.container}>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css';

export default class Phonebook extends Component {
  static defaultProps = {
    name: '',
    number: '',
  };

  static propTypes = {
    contacts: PropTypes.array,
    name: PropTypes.string,
    number: PropTypes.string,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.OnSaveContacts(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={s.container}>
        <form onSubmit={this.handleSubmit}>
          <label className={s.label}>
            Name
            <input
              className={s.input}
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required>              
              </input>
          </label>

          <label className={s.label}>
            Number
            <input
              className={s.input}
              name="number"
              type="text"
              value={this.state.number}
              onChange={this.handleChange}
              pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
              title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
              required>              
              </input>
          </label>

          <button className={s.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

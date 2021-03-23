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
            ></input>
          </label>

          <label className={s.label}>
            Number
            <input
              className={s.input}
              name="number"
              type="text"
              value={this.state.number}
              onChange={this.handleChange}
            ></input>
          </label>

          <button className={s.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

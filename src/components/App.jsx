import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Container, PhonebookHeader, ContactsHeader } from './App.styled';

import { FaPhoneSquareAlt , FaUser } from "react-icons/fa";

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/ContactFilter/ContactFilter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === name)) {
      Report.warning('Warning!', `${name} is already in contacts.`, 'Okay');
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
      Report.warning('Warning!', `${number} is already in contacts.`, 'Okay');
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
    Report.success('Success', 'New contact has been added!', 'Okay');
  };

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getContactsFromData = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
    Report.success('Success', `Contact was deleted!`, 'Okay');
  };

  render() {
    const { filter } = this.state;
    const contactsFromData = this.getContactsFromData();

    return (
      <Container>
        <PhonebookHeader><FaPhoneSquareAlt style={{marginRight: '5'}}/> Phonebook</PhonebookHeader>
        <ContactForm onSubmit={this.addContact} />
        <ContactsHeader><FaUser/>Contacts</ContactsHeader>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={contactsFromData}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;

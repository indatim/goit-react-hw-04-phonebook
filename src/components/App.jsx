import { useState, useEffect } from 'react';

import dataContacts from 'contacts.json';

import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Container, PhonebookHeader, ContactsHeader } from './App.styled';

import { FaPhoneSquareAlt , FaUser } from "react-icons/fa";

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/ContactFilter/ContactFilter';

export default function App() {

  const getDataLocalStorage = (
    key = 'id',
    defaultContacts = dataContacts
  ) => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultContacts;
  }; 

  const [contacts, setContacts] = useState(getDataLocalStorage());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
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

    setContacts(prevContacts => [newContact, ...prevContacts]);
    Report.success('Success', 'New contact has been added!', 'Okay');
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value.trim());
  }

  const getContactsFromData = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    Report.success('Success', `Contact was deleted!`, 'Okay');
  };

  return (
      <Container>
        <PhonebookHeader><FaPhoneSquareAlt style={{marginRight: '5'}}/> Phonebook</PhonebookHeader>
        <ContactForm onSubmit={addContact} />
        <ContactsHeader><FaUser style={{marginRight: '5'}}/> Contacts</ContactsHeader>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getContactsFromData()}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
  }
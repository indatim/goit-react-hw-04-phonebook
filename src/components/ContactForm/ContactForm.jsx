import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  ContactsForm,
  ContactFormLabel,
  ContactFormInput,
  ContactFormButton,
} from './ContactForm.styled';

export default function ContactForm({ onSubmit }) {
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactNameId = nanoid();
  const contactNumberId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  
  return (
      <ContactsForm onSubmit={handleSubmit}>
        <ContactFormLabel htmlFor={contactNameId}>
          Name
          <ContactFormInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
            id={contactNameId}
          />
        </ContactFormLabel>
        <ContactFormLabel htmlFor={contactNumberId}>
          Number
          <ContactFormInput
            type="text"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
            id={contactNumberId}
          />
        </ContactFormLabel>

        <ContactFormButton type="submit">Add contact</ContactFormButton>
      </ContactsForm>
    );
  }
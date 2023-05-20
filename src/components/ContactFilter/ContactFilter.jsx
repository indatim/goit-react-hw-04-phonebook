import React from 'react';
import PropTypes from 'prop-types';
import { ContactFilterLabel, ContactFilterInput } from './ContactFilter.styled';

const Filter = ({ value, onChange }) => (
  <ContactFilterLabel>
    Find contacts by name
    <ContactFilterInput type="text" value={value} onChange={onChange} />
  </ContactFilterLabel>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

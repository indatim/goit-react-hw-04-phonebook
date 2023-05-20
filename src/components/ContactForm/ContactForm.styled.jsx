import styled from '@emotion/styled';

export const ContactsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
  border: 3px dashed #2a2a2a;
  padding: 10px;
  background-color: #ffd11a;
`;

export const ContactFormLabel = styled.label`
  display: block;
  text-align: center;
  font-weight: 700;
`;

export const ContactFormInput = styled.input`
  display: block;
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const ContactFormButton = styled.button`
  padding: 10px;
  font-size: 16px;
  text-transform: capitalize;
  border: none;
  border-radius: 5px;
  &:hover,
  &:focus {
    background-color: #8a5dfc;
  }
`;

import styled from '@emotion/styled';

export const ContactListContainer = styled.ul`
  width: 500px;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;
  padding: 0;
  gap: 5px;
`;

export const ContactListItem = styled.li`
  text-align: center;
  font-size: 16px;
`;

export const ContactListText = styled.span`
  margin-right: 10px;
`;

export const ContactListButton = styled.button`
  padding: 5px;
  display: inline-flex;
  font-size: 14px;
  text-transform: capitalize;
  border: none;
  border-radius: 5px;
  align-items: center;

  &:hover,
  &:focus {
    background-color: #8a5dfc;
  }
`;

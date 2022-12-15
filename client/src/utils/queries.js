import { gql } from '@apollo/client';

export const GET_ME = gql`
  query get_me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;
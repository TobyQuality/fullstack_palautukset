import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
        name
        born
        bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, 
  $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
        name: $name
        born: $born
    ) {
      name
      born
      bookCount
    }
  }
`

export const ADD_AUTHOR = gql`
mutation addAuthor($name: String!) {
  addAuthor(
    name: $name
  ) {
    name
    born
    booksCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`  
    subscription {    
      bookAdded { ...BookDetails }  
    }  
    ${BOOK_DETAILS}
  `

  export const ME = gql`  
  query {    
    me { 
      username
      favoriteGenre
     }  
  }
`
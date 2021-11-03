import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Query {
    getBooks(
      paginationInput: PaginationInput
    ): BooksResponse
    getBook(
      bookId: ID!
    ): Book
  }

  type Mutation {
    createBook(
      token: ID!
      bookForm: CreateBookInput!
    ): Book
    updateBook(
      bookId: ID!
      bookForm: UpdateBookInput!
    ): Book
    deleteBook(
      bookId: ID!
    ): Boolean
  }

  type Book @key(fields: "id") {
    id: ID!
    name: String
    description: String
    created: Date
    updated: Date
  }

  type BooksResponse {
    data: [Book]
    paginationData: Pagination
  }

  extend type User @key(fields: "id") {
    id: ID @external
  }

  input CreateBookInput {
    name: String!
    description: String!
  }

  input UpdateBookInput {
    id: ID!
    name: String!
    description: String!
  }

  type Pagination {
    page: Int
    size: Int
    total: Int
    sort: [SortBy]
  }

  type SortBy {
    property: String
    direction: SortDirection
  }

  input PaginationInput {
    page: Int
    size: Int
    filter: [FilterByInput]
    sort: [SortByInput]
  }

  input FilterByInput {
    property: String
    value: String
  }

  input SortByInput {
    property: String
    direction: SortDirection
  }

  enum SortDirection {
    ASC
    DESC
  }
`;

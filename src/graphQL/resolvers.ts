import { GraphQLResolverMap } from 'apollo-graphql';

export const resolvers: GraphQLResolverMap<any> = {
  Query: {
    getBooks: async (_source, _args, ctx)=> {
      return ctx.dataSources.bookAPI.getBooks(_args.paginationInput);
    },
    getBook: async (_source, _args, ctx)=> {
      return ctx.dataSources.bookDB.getBookById(_args.bookId);
    },
  },
  // Mutation: {
  //   createBook: async (_source, _args, { dataSources }) => {
  //     return dataSources.bookDB.createBook(_args.bookForm);
  //   },
  //   updateBook: async (_source, _args, { dataSources }) => {
  //     return dataSources.bookDB.updateBook(_args.bookForm);
  //   },
  //   deleteBook: async (_source, _args, { dataSources }) => {
  //     return dataSources.bookDB.deleteBook(_args.bookId);
  //   },
  // },
  Book: {
    __resolveReference: async (obj, ctx) => {
      return ctx.dataSources.bookDB.loadBook(obj.id);
    }
  },
};

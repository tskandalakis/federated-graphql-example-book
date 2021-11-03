import { resolvers } from '../../../../src/graphQL/resolvers';

describe('Query getBook', () => {
  test('Calls proper dataSource', async () => {
    // @ts-ignore
    const res = await resolvers.Query.getBook({}, {
      bookId: 1
    }, {
      dataSources: {
        bookDB: {
          getBookById: (bookId: string) => {
            return true;
          }
        }
      }
    });
    await expect(res).toBe(true);
  });
});

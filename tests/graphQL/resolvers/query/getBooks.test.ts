import { resolvers } from '../../../../src/graphQL/resolvers';

describe('Query getBooks', () => {
  test('Calls proper dataSource', async () => {
    // @ts-ignore
    const res = await resolvers.Query.getBooks({}, {
      paginationInput: null
    }, {
      dataSources: {
        bookAPI: {
          getBooks: (idArr: string[]) => {
            return true;
          }
        }
      }
    });
    await expect(res).toBe(true);
  });
});

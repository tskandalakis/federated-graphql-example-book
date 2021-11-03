import { resolvers } from '../../../../src/graphQL/resolvers';

describe('Book', () => {
  test('__resolveReference', async () => {
    // @ts-ignore
    const res = await resolvers.Book.__resolveReference({
      id: 1
    }, {
      dataSources: {
        bookDB: {
          loadBook: (id: number) => {
            return {
              id,
              name: 'test'
            };
          }
        }
      }
    });
    await expect(res).toEqual({id: 1, name: 'test'});
  });
});

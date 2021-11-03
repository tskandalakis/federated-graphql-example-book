import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';
import {ApolloError} from 'apollo-server-express'

interface Book {
  id: number
  name: string
  description: string
  created: Date
  updated: Date
}

export class BookDB extends DataSource {
  context: any;
  dataLoader: any;
  fakeBookData: Book[];

  constructor() {
    // Can pass db connection in as arg and set as this.db;
    super();
    // this.db = any;
  }

  initialize(config: any) {
    this.context = config.context;
    this.dataLoader = {
      user: new DataLoader(async (idArr: number[]) => {
        const response = await this.getBooks(idArr);

        return idArr.map((id: number) =>
          response.find((book: any) => book.id === id)
        );
      })
    };
    this.fakeBookData = [{
      'id': 1,
      'name': '',
      'description': '',
      'created': new Date(),
      'updated': new Date()
    }, {
      'id': 2,
      'name': '',
      'description': '',
      'created': new Date(),
      'updated': new Date()
    }, {
      'id': 3,
      'name': '',
      'description': '',
      'created': new Date(),
      'updated': new Date()
    }]
  }

  async getBooks(idArr: number[]): Promise<Book[]> {
    return this.fakeBookData;
  }

  async getBookById(bookId: string): Promise<Book> {
    const selectedBook = this.fakeBookData.find((obj) => obj.id === parseInt(bookId, 10));

    if(selectedBook) {
      return selectedBook;
    } else {
      throw new ApolloError('Book not found.', 'NOT_FOUND');
    }
  }
}

import { Category } from './enums';
import { IBook, IOptions } from './interfaces';
import { TBookOrUndefined, TBookProperties } from './types';

export const getAllBooks = (): readonly IBook[] => {
  const books = <const>[
    {
      id: 1,
      title: 'Refactoring JavaScript',
      category: Category.JavaScript,
      author: 'Evan Burchard',
      available: true,
    },
    {
      id: 2,
      title: 'JavaScript Testing',
      category: Category.JavaScript,
      author: 'Liang Yuxian Eugene',
      available: false,
    },
    { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
    {
      id: 4,
      title: 'Mastering JavaScript Object-Oriented Programming',
      category: Category.JavaScript,
      author: 'Andrea Chiarelli',
      available: true,
    },
  ];

  return books;
};

export const logFirstAvailable = (books: readonly IBook[] = getAllBooks()): void => {
  const firstAvailableBookTitle = books.find(({ available }) => available)?.title || '-';

  console.log(`Total number of books: ${books.length}`);
  console.log(`First available book: ${firstAvailableBookTitle}`);
};

export const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
  return getAllBooks()
    .filter(book => book.category === category)
    .map(book => book?.title);
};

export const logBookTitles = (titles: string[]): void => {
  titles.forEach(title => console.log(title));
};

export const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
  const book = getAllBooks()[index];
  return [book?.title, book?.author];
};

export const calcTotalPages = (): bigint => {
  const data = <const>[
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
  ];

  const result = data.reduce((acc, curr) => {
    return acc + BigInt(curr.books) * BigInt(curr.avgPagesPerBook);
  }, 0n);

  return result;
};

export const createCustomerID = (name: string, id: number): string => {
  return `${name}-${id}`;
};

export const createCustomer = (name: string, age?: number, city?: string): void => {
  console.log(`Customer's name: ${name}`);
  if (age) console.log(`Customer's age: ${age}`);
  if (city) console.log(`Customer's city: ${city}`);
};

export const getBookByID = (id: IBook['id']): TBookOrUndefined => {
  const books = getAllBooks();
  return books.find(book => book.id === id);
};

export const checkoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
  console.log(`Customer name: ${customer}`);

  return bookIDs
    .map(id => getBookByID(id))
    .filter(book => book.available)
    .map(book => book.title);
};

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
  const books = getAllBooks();

  if (args.length === 1) {
    const [arg] = args;
    if (typeof arg === 'string') {
      return books.filter(({ author }) => author === arg).map(({ title }) => title);
    } else if (typeof arg === 'boolean') {
      return books.filter(({ available }) => available === arg).map(({ title }) => title);
    }
  } else if (args.length === 2) {
    const [argId, argAvailable] = args;
    if (typeof argId === 'number' && typeof argAvailable === 'boolean') {
      return books.filter(({ id, available }) => id === argId && available === argAvailable).map(({ title }) => title);
    }
  }
}

export function assertStringValue(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('value should have been a string');
  }
}

export const bookTitleTransform = (title: any): string | never => {
  assertStringValue(title);
  return [...title].reverse().join('');
};

export const printBook = (book: IBook): void => {
  console.log(`${book.title} by ${book.author}`);
};

export const getProperty = (book: IBook, prop: TBookProperties): any => {
  const value = book[prop];
  return typeof value === 'function' ? value.name : value;
};

export const setDefaultConfig = (options: IOptions): IOptions => {
  options.duration ??= 100;
  options.speed ??= 50;
  return options;
};

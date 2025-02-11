import { Category } from './enums';
import { IBook, ICallback, ILibMgrCallback, IOptions } from './interfaces';
import { TBookOrUndefined, TBookProperties } from './types';
import { RefBook } from './classes';

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

export function assertRefBookInstance(condiditon: any): asserts condiditon {
  if (!condiditon) {
    throw new Error('It is not an instance of RefBook');
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

export const printRefBook = (data: any): void => {
  assertRefBookInstance(data instanceof RefBook);
  data.printItem();
};

export function purge<T>(inventory: T[]): T[] {
  return inventory.slice(2);
}

export function getObjectProperty<TObject, TKey extends keyof TObject>(
  obj: TObject,
  prop: TKey,
): TObject[TKey] | string {
  const value = obj[prop];
  return typeof value === 'function' ? value.name : value;
}

// export function getBooksByCategory(category: Category, callback: ILibMgrCallback): void {
export function getBooksByCategory(category: Category, callback: ICallback<string[]>): void {
  setTimeout(() => {
    try {
      const titles = getBookTitlesByCategory(category);

      if (titles.length > 0) {
        callback(null, titles);
      } else {
        throw new Error('No books found');
      }
    } catch (err) {
      callback(err, null);
    }
  }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
  if (err) {
    console.log(err.message);
  } else {
    console.log(titles);
  }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
  const p = new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      const titles = getBookTitlesByCategory(category);

      if (titles.length > 0) {
        resolve(titles);
      } else {
        reject('No books found');
      }
    }, 2000);
  });

  return p;
}

export async function logSearchResults(category: Category) {
  const result: Awaited<ReturnType<typeof getBooksByCategoryPromise>> = await getBooksByCategoryPromise(category);
  console.log(result.length);
}

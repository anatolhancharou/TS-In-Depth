/* eslint-disable no-redeclare */
showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

enum Category {
  JavaScript,
  CSS,
  HTML,
  TypeScript,
  Angular,
}

type TBook = {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
};

interface IBook {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
  pages?: number;
  markDamaged?: IDamageLogger;
  // markDamaged?(reason: string): void;
}

interface IDamageLogger {
  (reason: string): void;
}

const getAllBooks = (): readonly IBook[] => {
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

const logFirstAvailable = (books: readonly TBook[] = getAllBooks()): void => {
  const firstAvailableBookTitle = books.find(({ available }) => available)?.title || '-';

  console.log(`Total number of books: ${books.length}`);
  console.log(`First available book: ${firstAvailableBookTitle}`);
};

const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
  return getAllBooks()
    .filter(book => book.category === category)
    .map(book => book?.title);
};

const logBookTitles = (titles: string[]): void => {
  titles.forEach(title => console.log(title));
};

const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
  const book = getAllBooks()[index];
  return [book?.title, book?.author];
};

const calcTotalPages = (): bigint => {
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

const createCustomerID = (name: string, id: number): string => {
  return `${name}-${id}`;
};

const createCustomer = (name: string, age?: number, city?: string): void => {
  console.log(`Customer's name: ${name}`);
  if (age) console.log(`Customer's age: ${age}`);
  if (city) console.log(`Customer's city: ${city}`);
};

const getBookByID = (id: IBook['id']): IBook | undefined => {
  const books = getAllBooks();
  return books.find(book => book.id === id);
};

const checkoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
  console.log(`Customer name: ${customer}`);

  return bookIDs
    .map(id => getBookByID(id))
    .filter(book => book.available)
    .map(book => book.title);
};

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
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

function assertStringValue(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('value should have been a string');
  }
}

const bookTitleTransform = (title: any): string | never => {
  assertStringValue(title);

  return [...title].reverse().join('');
};

const printBook = (book: IBook): void => {
  console.log(`${book.title} by ${book.author}`);
};

// ========================================
// Task 02.01
// logFirstAvailable(getAllBooks());
// logBookTitles(getBookTitlesByCategory(Category.JavaScript));
// logBookTitles(getBookTitlesByCategory(Category.CSS));
// logBookTitles(getBookTitlesByCategory(Category.Angular));
// console.log(getBookAuthorByIndex(1));
// console.log(calcTotalPages());

// Task 03.01
// const myID: string = createCustomerID('Ann', 10);
// console.log(myID);
// let idGenerator: (name: string, id: number) => string;
// idGenerator = (name: string, id: number) => `${name}-${id}`;
// idGenerator = createCustomerID;
// console.log(idGenerator('Tom', 21));

// Task 03.02
// const customer1 = createCustomer('Alex');
// const customer2 = createCustomer('Olia', 23);
// const customer4 = createCustomer('Bogdan', 23, 'Kiyv');
// console.log(getBookTitlesByCategory());
// logFirstAvailable();
// console.log(getBookByID(1));
// const myBooks: string[] = checkoutBooks('Ann', ...[1, 2, 4]);
// console.log(myBooks);

// Task 03.03
// console.log(getTitles(false));

// Task 03.04
// console.log(bookTitleTransform('TypeScript'));
// console.log(bookTitleTransform(42));

// Task 04.01
// const myBook: IBook = {
//   id: 5,
//   title: 'Colors, Backgrounds, and Gradients',
//   author: 'Eric A. Meyer',
//   available: true,
//   category: Category.CSS,
//   pages: 200,
//   markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
// };
// printBook(myBook);
// myBook.markDamaged('missing back cover');

// Task 04.02
const logDamage: IDamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');

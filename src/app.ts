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

type TBookProperties = keyof IBook;

type TPersonBook = IPerson & IBook;

type TBookOrUndefined = IBook | undefined;

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

interface IPerson {
  name: string;
  email: string;
}

interface IAuthor extends IPerson {
  numBooksPublished: number;
}

interface ILibrarian extends IPerson {
  department: string;
  assistCustomer: (custName: string, bookTitle: string) => void;
}

interface IOptions {
  duration?: number;
  speed?: number;
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

const getBookByID = (id: IBook['id']): TBookOrUndefined => {
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

const getProperty = (book: IBook, prop: TBookProperties): any => {
  const value = book[prop];
  return typeof value === 'function' ? value.name : value;
};

const setDefaultConfig = (options: IOptions): IOptions => {
  options.duration ??= 100;
  options.speed ??= 50;
  return options;
};

abstract class ReferenceItem {
  // title: string;
  // year: number;

  // constructor(newTitle: string, newYear: number) {
  //   console.log('Creating a new ReferenceItem...');
  //   this.title = newTitle;
  //   this.year = newYear;
  // }

  private _publisher: string;

  #id: number;

  static department: string = 'Research Department';

  constructor(id: number, public title: string, protected year: number) {
    console.log('Creating a new ReferenceItem...');
    this.#id = id;
  }

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
    console.log(`Department: ${Object.getPrototypeOf(this).constructor.department}`);
  }

  getID(): number {
    return this.#id;
  }

  abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
  constructor(id: number, title: string, year: number, public edition: number) {
    super(id, title, year);
  }

  override printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}

class UniversityLibrarian implements ILibrarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string, bookTitle: string): void {
    console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
  }
}

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
// const logDamage: IDamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
// logDamage('missing back cover');

// Task 04.03
// const favouriteAuthor: IAuthor = {
//   name: 'Patrick Rothfuss',
//   email: 'prothfuss@example.com',
//   numBooksPublished: 4,
// };
// const favouriteLibrarian: ILibrarian = {
//   name: 'Jessica Thompson',
//   email: 'jest@example.com',
//   department: 'Magic & Fantasy',
//   assistCustomer(custName: string, bookTitle: string) {
//     console.log(custName);
//     console.log(bookTitle);
//   },
// };

// Task 04.04
// const offer: any = {
//   book: {
//     title: 'Essential TypeScript',
//   },
// };

// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle());
// console.log(offer.book.getTitle?.());
// console.log(offer.book.authors?.[0]);

// Task 04.05
// console.log(getProperty(getAllBooks()[0], 'title'));
// console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn'));

// Task 05.01
// const ref = new ReferenceItem(42, 'Learn TypeScript', 2022);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'Scholastic';
// console.log(ref.publisher);
// console.log(ref.getID());

// Task 05.02
// const refBook = new Encyclopedia(42, 'Learn TypeScript', 2022, 2);
// console.log(refBook);
// refBook.printItem();

// Task 05.03
// const refBook = new Encyclopedia(42, 'Learn TypeScript', 2022, 2);
// refBook.printCitation();

// Task 05.04
// const favouriteLibrarian: ILibrarian = new UniversityLibrarian();
// favouriteLibrarian.name = 'Emma';
// favouriteLibrarian.assistCustomer('Nicolas Flamel', 'Philosopher\'s stone');

// Task 05.05
const personBook: TPersonBook = {
  id: 1,
  author: 'Jessica',
  category: Category.TypeScript,
  available: true,
  email: 'jess@example.com',
  name: 'Jessica',
  title: 'Learn TypeScript'
};
let o: IOptions = { speed: 55 };
o = setDefaultConfig(o);
console.log(o);

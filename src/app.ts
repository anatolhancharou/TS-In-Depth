import { Category } from './enums';
import { printRefBook, setDefaultConfig, purge } from './functions';
import { IBook, ILibrarian, ILogger, IOptions } from './interfaces';
import { TPersonBook } from './types';
import { RefBook, UL } from './classes';
import type { Library } from './classes';
import { Library as L } from './classes/library';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
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
// const logDamage: ILogger = (reason: string) => console.log(`Damaged: ${reason}`);
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

// Task 05.02, 05.03, 06.03
// const refBook = new RefBook(42, 'Learn TypeScript', 2022, 2);
// console.log(refBook);
// refBook.printItem();
// refBook.printCitation();
// printRefBook(refBook);
// const favouriteLibrarian: ILibrarian = new UL.UniversityLibrarian();
// favouriteLibrarian.name = 'Emma';
// printRefBook(favouriteLibrarian);

// Task 05.04
// const favouriteLibrarian: ILibrarian = new UL.UniversityLibrarian();
// favouriteLibrarian.name = 'Emma';
// favouriteLibrarian.assistCustomer('Nicolas Flamel', 'Philosopher\'s stone');

// Task 05.05
// const personBook: TPersonBook = {
//   id: 1,
//   author: 'Jessica',
//   category: Category.TypeScript,
//   available: true,
//   email: 'jess@example.com',
//   name: 'Jessica',
//   title: 'Learn TypeScript',
// };
// let o: IOptions = { speed: 55 };
// o = setDefaultConfig(o);
// console.log(o);

// Task 06.05
// const flag = true;
// if (flag) {
//   import('./classes')
//     .then(module => {
//       const reader = new module.Reader();
//       console.log(reader);
//     })
//     .catch(err => console.log(err));
// }

// if (flag) {
//   const module = await import('./classes');
//   const reader = new module.Reader();
//   console.log(reader);
// }

// Task 06.06
// let lib1: Library = new L();
// let lib2: Library = {
//   id: 1,
//   address: 'N/A',
//   name: '1001 books',
// };
// console.log(lib2);

// Task 07.01
const inventory: IBook[] = [
  { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
  { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
  { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
  { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

let result: IBook[] | number[] = purge<IBook>(inventory);
console.log(result);
result = purge<number>([1, 2, 3]);

import { Category } from './enums';

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

export { IBook, IDamageLogger as ILogger, IPerson, IAuthor, ILibrarian, IOptions };

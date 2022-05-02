import { IBook, IPerson } from './interfaces';

// type TBook = {
//   id: number;
//   title: string;
//   author: string;
//   available: boolean;
//   category: Category;
// };

export type TBookProperties = keyof IBook;
export type TPersonBook = IPerson & IBook;
export type TBookOrUndefined = IBook | undefined;

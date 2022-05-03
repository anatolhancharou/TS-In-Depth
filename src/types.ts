import { createCustomer } from './functions';
import { IAuthor, IBook, IPerson } from './interfaces';

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

export type TBookRequiredFields = Required<IBook>;
export type TUpdatedBook = Partial<IBook>;
export type TAuthorWoEmail = Omit<IAuthor, 'email'>;
export type TСreateCustomerFunctionType = typeof createCustomer;

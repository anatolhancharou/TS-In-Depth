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

type fn = (p1: string, p2: number, p3: boolean) => symbol;
type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

type fn1 = (p1: string) => string;

type P4 = Param1<fn1>;

import * as Interfaces from './interfaces';

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
    // console.log(`Department: ${Object.getPrototypeOf(this).constructor.department}`);
  }

  getID(): number {
    return this.#id;
  }

  abstract printCitation(): void;
}

class UniversityLibrarian implements Interfaces.ILibrarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string, bookTitle: string): void {
    console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
  }
}

export { ReferenceItem, UniversityLibrarian };

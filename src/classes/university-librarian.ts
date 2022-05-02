import * as Interfaces from '../interfaces';

class UniversityLibrarian implements Interfaces.ILibrarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string, bookTitle: string): void {
    console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
  }
}

export { UniversityLibrarian };

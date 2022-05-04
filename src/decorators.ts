export function sealed(s: string) {
  return function (target: Function): void {
    console.log(`Sealing the constructor ${s}`);
    Object.seal(target);
    Object.seal(target.prototype);
  };
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
  const newConstructor: Function = function () {
    console.log('Creating new instance');
    console.log(target.name);

    this.age = 30;
  };

  newConstructor.prototype = Object.create(target.prototype);
  // Object.setPrototypeOf(newConstructor.prototype, target.prototype);

  newConstructor.prototype.printLibrarian = function (): void {
    console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
  };

  return newConstructor as TFunction;
}

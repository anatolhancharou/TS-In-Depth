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

export function writable(isWritable: boolean) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log(`Method decorator for ${methodName}`);
    descriptor.writable = isWritable;
    return descriptor;
  };
}

export function timeout(ms: number = 0) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
      if (window.confirm('Are you sure?')) {
        setTimeout(() => {
          originalMethod.apply(this, args);
        }, ms);
      }
    };

    return descriptor;
  };
}

export function logParameter(target: any, methodName: string, paramIndex: number): void {
  const key = `${methodName}_decor_params_indexes`;

  if (Array.isArray(target[key])) {
    target[key].push(paramIndex);
  } else {
    target[key] = [paramIndex];
  }
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: Parameters<typeof originalMethod>): ReturnType<typeof originalMethod> {
    const key = `${methodName}_decor_params_indexes`;
    const indexes = target[key];

    if (Array.isArray(indexes)) {
      args.forEach((arg, index) => {
        if (indexes.includes(index)) {
          console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
        }
      });
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

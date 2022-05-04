export function sealed(s: string) {
  return function (target: Function): void {
    console.log(`Sealing the constructor ${s}`);
    Object.seal(target);
    Object.seal(target.prototype);
  };
}

export class BaseRequest<T> {
  constructor(init: Partial<T>) {
    Object.assign(this, init);
  }
}

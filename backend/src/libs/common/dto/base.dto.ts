export class BaseDto<T> {
  constructor(init?: Partial<T>) {
    if (init != null) {
      Object.assign(this, init);
    }
  }

  id?: string;
}

export class BaseResponse<T> {
  constructor(init?: Partial<T>) {
    this.success = true;
    if (init != null) {
      Object.assign(this, init);
    }
  }

  success: boolean;
}

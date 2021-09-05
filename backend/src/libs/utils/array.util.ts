import { arrayNotEmpty, isArray, isEmpty, isNotEmpty } from 'class-validator';

export class ArrayUtil {
  static first<T>(values: T[], nullValue?: T): T {
    if (isEmpty(values)) {
      return nullValue || null;
    }

    if (!arrayNotEmpty(values)) {
      return nullValue || null;
    }

    return values[0];
  }

  static last<T>(values: T[], nullValue?: T): T {
    if (isEmpty(values)) {
      return nullValue || null;
    }

    if (!arrayNotEmpty(values)) {
      return nullValue || null;
    }

    return values[values.length - 1];
  }

  static count<T>(values: T[]): number {
    if (isEmpty(values)) {
      return 0;
    }

    return values.length;
  }

  static flatten<T>(values: any): T[] {
    const data = [];

    if (isEmpty(values)) {
      return data;
    }

    if (!isArray(values)) {
      data.push(values);
      return data;
    }

    for (const item of values) {
      if (isEmpty(item)) {
        continue;
      }

      if (!isArray(item)) {
        data.push(item);
        continue;
      }

      data.push(...ArrayUtil.flatten(item));
    }

    return data;
  }

  static sum(...numbers: number[]) {
    let total = 0;

    if (arrayNotEmpty(numbers)) {
      for (const value of numbers) {
        total += value || 0;
      }
    }
    return total;
  }

  static toFullName(firstName: string, lastName: string): string {
    return [firstName, lastName]
      .filter((n) => isNotEmpty(n))
      .map((n) => n.trim())
      .join(' ');
  }
}

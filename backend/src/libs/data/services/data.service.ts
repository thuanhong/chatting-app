import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import * as randomize from 'randomatic';
import { arrayNotEmpty, isEmpty, isNotEmptyObject } from 'class-validator';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import {
  getConnection,
  ObjectType,
  Repository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { PagingInfo } from '@src/interface/paging-info.interface';
import { ArrayUtil } from '@src/utils/array.util';

@Injectable()
export class DataService {
  public defaultTake = 15;
  public defaultSave = 100;

  public generateId(): string {
    return uuidV4();
  }

  public generateHash(): string {
    return uuidV4();
  }

  public generateCode(): string {
    return randomize('0', 6);
  }

  public generate4Number(): string {
    return randomize('0', 4);
  }

  public generatePassword(): string {
    return randomize('Aa0!', 10);
  }

  public generateToken(): string {
    return randomize('Aa0', 128);
  }

  async getRepository(target: ObjectType<any>): Promise<Repository<any>> {
    const connection = await getConnection();
    return connection.getRepository(target);
  }

  async search<T>(
    type: ObjectType<T>,
    next: PagingInfo,
    allowSort: {
      [P in keyof T]?: 'ASC' | 'DESC' | 1 | -1;
    },
    condition: FindManyOptions<T>,
  ): Promise<[T[], PagingInfo]> {
    const { nextPage, take } = this.buildCondition(next, allowSort, condition);
    const repo = await this.getRepository(type);
    let result = await repo.find(condition);

    if (isEmpty(nextPage.pageIndex)) {
      nextPage.pageIndex = 0;
    }

    if (result.length > take) {
      nextPage.pageIndex++;
      nextPage.isEnd = false;
      result = result.splice(0, take);
    } else {
      nextPage.pageIndex = nextPage.pageIndex || 0;
      nextPage.isEnd = true;
    }

    return [result, nextPage];
  }

  async firstOrDefault<T>(
    target: ObjectType<any>,
    condition: FindOneOptions<any>,
  ): Promise<T> {
    const repo = await this.getRepository(target);
    if (repo == null) {
      return null;
    }

    return (await repo.findOne(condition)) || null;
  }

  async update<T>(): Promise<T> {
    return;
  }

  async delete(
    target: ObjectType<any>,
    ...conditions: FindConditions<any>[]
  ): Promise<number> {
    if (!arrayNotEmpty(conditions)) {
      return 0;
    }

    const repo = await this.getRepository(target);

    if (repo == null) {
      return 0;
    }

    const results = await Promise.all(
      conditions.map((condition) => repo.delete(condition)),
    );
    return ArrayUtil.sum(...results.map((e) => e.affected));
  }

  async find<T>(
    target: ObjectType<any>,
    condition?: FindManyOptions<any>,
  ): Promise<T[]> {
    const repo = await this.getRepository(target);
    return await repo.find(condition);
  }

  async asQuery<T>(
    target: ObjectType<any>,
    alias?: string,
  ): Promise<SelectQueryBuilder<T>> {
    const repo = await this.getRepository(target);
    return repo.createQueryBuilder(alias);
  }

  async insert(
    target: ObjectType<any>,
    ...entities: QueryDeepPartialEntity<any>[]
  ): Promise<InsertResult> {
    const repo = await this.getRepository(target);
    return await repo.insert(entities);
  }

  public async save<T>(
    target: ObjectType<any>,
    ...entities: T[]
  ): Promise<T[]> {
    const repo = await this.getRepository(target);
    if (repo != null) {
      return await repo.save(entities, { chunk: this.defaultSave });
    }
    return null;
  }

  private buildCondition<T>(
    next: PagingInfo,
    allowSort: { [P in keyof T]?: 'ASC' | 'DESC' | 1 | -1 },
    condition: FindManyOptions<T>,
  ) {
    const nextPage: PagingInfo = {};

    if (next != null) {
      Object.assign(nextPage, next);
    }

    const take = nextPage?.take || this.defaultTake;

    const defaultCondition: FindManyOptions<T> = {
      take: take + 1,
      skip: 0,
      order: allowSort || {},
    };

    Object.assign(condition, defaultCondition);

    let order = {};
    let orderBy, direct;

    for (const orderKey in condition.order) {
      const key: string = orderKey;
      direct = order[key] = condition.order[key];
      orderBy = key;
      break;
    }

    if (
      next != null &&
      next.orderBy != null &&
      condition.order[next.orderBy] != null
    ) {
      order = {};
      direct = order[next.orderBy] = next.direct;
    }

    nextPage.orderBy = nextPage.orderBy || orderBy;
    nextPage.direct = direct.toUpperCase();

    if (next != null && next.pageIndex > 0) {
      condition.skip = next.pageIndex * take;
    }
    return { nextPage, take };
  }
}

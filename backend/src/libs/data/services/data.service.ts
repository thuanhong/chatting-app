import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import * as randomize from 'randomatic';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';

@Injectable()
export class DataService {
  public async save(): Promise<void> {
    return;
  }

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

  async firstOrDefault(): Promise<any> {
    return;
  }

  async search(): Promise<any> {
    return;
  }

  async searchAll(): Promise<any[]> {
    return;
  }

  async update(): Promise<any> {
    return;
  }

  async delete(): Promise<number> {
    return;
  }
  async find(): Promise<any[]> {
    return;
  }

  async asQuery(query: string): Promise<string> {
    return query;
  }

  async insert(): Promise<InsertResult> {
    return;
  }
}

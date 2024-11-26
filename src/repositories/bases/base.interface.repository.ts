export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  find(conditions: any): Promise<T[]>;
  update(id: string, data: T | any): Promise<[number, T[]]>;
  delete(id: string): Promise<number>; //return of number row deleted
  findWithRelation(relation: any): Promise<T[]>;
}

import { Model, ModelCtor } from 'sequelize-typescript';
import { BaseInterfaceRepository } from './base.interface.repository';
import { Attributes, WhereOptions } from 'sequelize';

export abstract class BaseAbstractRepository<T extends Model>
  implements BaseInterfaceRepository<T>
{
  constructor(private readonly model: ModelCtor<T>) {}

  public async create(data: T | any): Promise<T> {
    return this.model.create(data as any);
  }

  public async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  public async findById(id: string): Promise<T> {
    return this.model.findByPk(id);
  }

  public async update(id: string, data: T | any): Promise<[number, T[]]> {
    return this.model.update(data, {
      where: { id } as unknown as WhereOptions<Attributes<T>>,
      returning: true,
    });
  }

  public async delete(id: string): Promise<number> {
    return this.model.destroy({
      where: { id } as unknown as WhereOptions<Attributes<T>>,
    });
  }

  public async findWithRelation(relation: any): Promise<T[]> {
    return this.model.findAll({
      include: relation,
    });
  }

  public async find(conditions?: any): Promise<T[]> {
    return this.model.findAll(conditions);
  }

  public async findOne(conditions?: any): Promise<T> {
    return this.model.findOne(conditions);
  }
}

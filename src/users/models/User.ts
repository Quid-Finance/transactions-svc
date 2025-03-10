import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Photo } from '../../photos/models/Photo';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column
  password: string;

  @HasMany(() => Photo)
  photos: Photo[];
}

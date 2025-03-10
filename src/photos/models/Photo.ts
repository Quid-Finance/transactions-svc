import {
  Model,
  BelongsTo,
  Column,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/User';

@Table
export class Photo extends Model {
  @Column
  url: string;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Debts } from 'src/pokazania/models/debts.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Pokazania } from 'src/pokazania/models/pokazania.model';
import { Users } from './user.model';
import { SNT } from 'src/snt/model/snt.model';

export interface UchastokCreationAttrs {
  uchastok: number;
  userId: number;
}

@Table({ tableName: 'Sites' })
export class Uchastki extends Model<Uchastki, UchastokCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  uchastok: number;

  @Column({ type: DataType.FLOAT })
  sotki: number;

  @ForeignKey(() => Users)
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => SNT)
  @Column({ type: DataType.INTEGER })
  SntId: number;

  @HasMany(() => Pokazania)
  pokazania: Pokazania[];

  @HasOne(() => Debts)
  debt: Debts;

  @HasMany(() => Payment)
  payments: Payment[];
}

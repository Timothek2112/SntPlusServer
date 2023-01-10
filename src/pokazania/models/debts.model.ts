import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Uchastki } from 'src/getPass/models/uchastki.model';
import { User } from 'src/getPass/models/user.model';

interface DebtCreationAttrs {
  water: number;
  electricity: number;
  membership: number;
  penality: number;
  target: number;
}

@Table({ tableName: 'debts' })
export class Debts extends Model<Debts, DebtCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.FLOAT })
  water: number;

  @Column({ type: DataType.FLOAT })
  electricity: number;

  @Column({ type: DataType.FLOAT })
  penality: number;

  @Column({ type: DataType.FLOAT })
  membership: number;

  @Column({ type: DataType.FLOAT })
  target: number;

  @ForeignKey(() => Uchastki)
  uchastokId: number;

  @BelongsTo(() => Uchastki)
  uchastok: Uchastki;
}

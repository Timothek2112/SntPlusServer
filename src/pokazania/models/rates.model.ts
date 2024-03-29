import { Model } from 'sequelize-typescript';
import {
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { SNT } from 'src/snt/model/snt.model';

interface RatesCreationAttrs {
  water: number;
  electricity: number;
  month: number;
  year: number;
}

@Table({ tableName: 'Rates' })
export class Rates extends Model<Rates, RatesCreationAttrs> {
  @Column({ type: DataType.FLOAT })
  water: number;

  @Column({ type: DataType.FLOAT })
  electricity: number;

  @Column({ type: DataType.FLOAT })
  membership: number;

  @Column({ type: DataType.INTEGER })
  month: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @ForeignKey(() => SNT)
  @Column({ type: DataType.INTEGER })
  SntId: number;
}

import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

interface IRoleCreationAttr{
    name: string;
    description: string;

}

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model<Role,IRoleCreationAttr>{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @HasMany(() => User)
  users: User[];
}

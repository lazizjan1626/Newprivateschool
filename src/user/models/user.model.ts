import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "../../role/models/role.model";

interface IUserCreationAttr {
    full_name: string;
    email: string;
    hashed_password: string;
    phone_number: string;
    roleID: number;
    is_creator: boolean;
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model<User, IUserCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string;


    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleID: number;

    @BelongsTo(() => Role)
    role: Role;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_creator: boolean;
}

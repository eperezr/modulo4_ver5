import { DataTypes } from "sequelize";
import { Status } from "../constants/index.js";
import { sequelize } from "../database/database.js";
import { Task } from "./task.js";
import { encriptar } from "../common/bycript.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notNull:{
                msg: 'ingrese nombre de usuario',
            },
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'ingrese password',
            },
        },
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: `Debe ser ${Status.ACTIVE} o ${Status.INACTIVE}`,
            },
        },
    },
});

//usuario muchas tareas
User.hasMany(Task)
//tareas a un solo usuario 
Task.belongsTo(User)


/*User.hasMany(Task,{
    foreignKey: 'userId',
    sourceKey: 'id',
});

Task.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
});*/

User.beforeCreate(async(user) => {
    try {
       user.password = await encriptar(user.password)
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al ecriptar la contraseña ');
    }
});

User.beforeUpdate(async(user) => {
    try {
       user.password = await encriptar(user.password)
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al ecriptar la contraseña ');
    }
});
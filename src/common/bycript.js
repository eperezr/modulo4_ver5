import logger from "../logs/logger.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const encriptar = async (text) => {

    try {
        const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);                                                                // Antes de usarlo, lo convertimos a número entero con parseInt
        return await bcrypt.hash(text, saltRound);        
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }

}

export const comparar = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar las contraseñas');
    }
};

export default {
    encriptar,
    comparar
};
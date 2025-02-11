import userModel from '../models/userModel.js';
import { hashPassword } from '../../utils/bcrypt.js';

export class UserManager {
    async createUser(userData) {
        try {
            userData.password = hashPassword(userData.password);
            const user = new userModel(userData);
            await user.save();
            return user;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('El email ya está registrado.');
            }
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario por email: ' + error.message);
        }
    }

    async updateUser(id, userData) {
        try {
            if (userData.password) {
                userData.password = hashPassword(userData.password);
            }
            const user = await userModel.findByIdAndUpdate(id, userData, { new: true });
            return user;
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            const result = await userModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }

    async getAllUsers() {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    }
}
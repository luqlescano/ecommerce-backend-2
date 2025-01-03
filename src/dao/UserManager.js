import userModel from './models/userModel.js';

class UserManager {
    // Crear un nuevo usuario
    async createUser(userData) {
        try {
            const user = new userModel(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    // Obtener un usuario por ID
    async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }

    // Obtener un usuario por email
    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario por email: ' + error.message);
        }
    }

    // Actualizar un usuario
    async updateUser(id, userData) {
        try {
            const user = await userModel.findByIdAndUpdate(id, userData, { new: true });
            return user;
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }

    // Eliminar un usuario
    async deleteUser(id) {
        try {
            const result = await userModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }

    // Obtener todos los usuarios (opcional)
    async getAllUsers() {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    }
}

export default new UserManager();
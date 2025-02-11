import userModel from '../models/userModel.js';
import UserDTO from '../dto/user.dto.js';

export default class UserDAO {
    async createUser(userData) {
        try {
            const newUser = await userModel.create(userData);
            return new UserDTO(newUser);
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('El email ya está registrado.');
            }
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    async getUserById(id) {
        const user = await userModel.findById(id).populate('cart');
        return user ? new UserDTO(user) : null;
    }

    async getUserByEmail(email) {
        const user = await userModel.findOne({ email }).populate('cart');
        return user ? new UserDTO(user) : null;
    }

    async updateUser(id, userData) {
        const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true }).populate('cart');
        return updatedUser ? new UserDTO(updatedUser) : null;
    }

    async deleteUser(id) {
        return await userModel.findByIdAndDelete(id);
    }

    async getAllUsers() {
        const users = await userModel.find().populate('cart');
        return users.map(user => new UserDTO(user));
    }
}
import UserDAO from '../dao/user.dao.js';

export default class UserRepository {
    constructor() {
        this.userDAO = new UserDAO();
    }

    async createUser(userData) {
        return await this.userDAO.createUser(userData);
    }

    async getUserById(id) {
        return await this.userDAO.getUserById(id);
    }

    async getUserByEmail(email) {
        return await this.userDAO.getUserByEmail(email);
    }

    async updateUser(id, userData) {
        return await this.userDAO.updateUser(id, userData);
    }

    async deleteUser(id) {
        return await this.userDAO.deleteUser(id);
    }

    async getAllUsers() {
        return await this.userDAO.getAllUsers();
    }
}
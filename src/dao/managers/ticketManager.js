import ticketModel from '../models/ticketModel.js';
import { v4 as uuidv4 } from 'uuid';

export default class TicketManager {
    async createTicket(purchaser, amount) {
        try {
            const ticket = await ticketModel.create({
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount,
                purchaser
            });
            return ticket;
        } catch (error) {
            throw new Error('Error al crear el ticket: ' + error.message);
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await ticketModel.findById(id);
            return ticket;
        } catch (error) {
            throw new Error('Error al obtener el ticket: ' + error.message);
        }
    }

    async getAllTickets() {
        try {
            return await ticketModel.find();
        } catch (error) {
            throw new Error('Error al obtener los tickets: ' + error.message);
        }
    }

    async deleteTicket(id) {
        try {
            return await ticketModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar el ticket: ' + error.message);
        }
    }
}
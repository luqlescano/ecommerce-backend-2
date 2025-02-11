import ticketModel from '../models/ticketModel.js';
import TicketDTO from '../dto/ticket.dto.js';

export default class TicketDAO {
    async createTicket(ticketData) {
        try {
            const newTicket = new ticketModel(ticketData);
            await newTicket.save();
            return new TicketDTO(newTicket);
        } catch (error) {
            throw new Error('Error al crear el ticket: ' + error.message);
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await ticketModel.findById(id);
            return ticket ? new TicketDTO(ticket) : null;
        } catch (error) {
            throw new Error('Error al obtener el ticket: ' + error.message);
        }
    }

    async getAllTickets() {
        try {
            const tickets = await ticketModel.find();
            return tickets.map(ticket => new TicketDTO(ticket));
        } catch (error) {
            throw new Error('Error al obtener los tickets: ' + error.message);
        }
    }

    async deleteTicket(id) {
        try {
            const result = await ticketModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el ticket: ' + error.message);
        }
    }
}
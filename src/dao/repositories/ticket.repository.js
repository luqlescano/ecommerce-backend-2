import TicketDAO from '../dao/ticket.dao.js';

export default class TicketRepository {
    constructor() {
        this.ticketDAO = new TicketDAO();
    }

    async createTicket(ticketData) {
        return await this.ticketDAO.createTicket(ticketData);
    }

    async getTicketById(id) {
        return await this.ticketDAO.getTicketById(id);
    }

    async getAllTickets() {
        return await this.ticketDAO.getAllTickets();
    }

    async deleteTicket(id) {
        return await this.ticketDAO.deleteTicket(id);
    }
}
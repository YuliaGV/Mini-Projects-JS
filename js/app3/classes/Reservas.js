class Reservas {
    constructor() {
        this.reservas = []
    }
    agregarReserva(reserva) {
        this.reservas = [...this.reservas, reserva];
    }
    editarReserva(reservaActualizada) {
        this.reservas = this.reservas.map( reserva => reserva.id === reservaActualizada.id ? reservaActualizada : reserva)
    }

    eliminarReserva(id) {
        this.reservas = this.reservas.filter( reserva => reserva.id !== id);
    }
}

export default Reservas; 
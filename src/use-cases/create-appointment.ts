import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from '../repositories/appointments-repository'

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {

  }
  async execute({ 
    customer, 
    startsAt, 
    endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentRequest> {
    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    )

    if(overlappingAppointment) {
      throw new Error('appointment overlapping')
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt
    })

    await this.appointmentsRepository.create(appointment)

    return appointment;
  }
}
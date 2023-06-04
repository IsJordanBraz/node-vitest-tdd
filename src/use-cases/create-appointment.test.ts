import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from '../tests/utils/get-future-date'
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('create appointment', () => {
  it('create appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-06-04')
    const endsAt = getFutureDate('2022-06-05')

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })
  it('it should not create appointment with overlapping dates', async () => {
    const appointmentsRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-06-04')
    const endsAt = getFutureDate('2022-06-15')

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-06-13'),
      endsAt: getFutureDate('2022-06-18')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-06-08'),
      endsAt: getFutureDate('2022-06-12')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-06-03'),
      endsAt: getFutureDate('2022-06-18')
    })).rejects.toBeInstanceOf(Error)
  })
})
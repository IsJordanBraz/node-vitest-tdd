import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";

describe('create appointment', () => {
  it('create appointment', () => {
    const createAppointment = new CreateAppointment();

    const startsAt = new Date()
    const endsAt = new Date()
  
    endsAt.setDate(endsAt.getDate() - 1)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })
})
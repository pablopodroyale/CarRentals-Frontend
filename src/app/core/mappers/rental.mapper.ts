import { Rental } from '../models/rental.model';
import { RentalDto } from '../dtos/rental.dto';

export function mapRentalDtoToModel(dto: RentalDto): Rental {
  return {
    id: dto.id,
    customer: {
      dni: dto.customerId,
      fullName: dto.fullName,
      address: dto.address
    },
    car: {
      type: dto.carType,
      model: dto.model,
      location: dto.location
    },
    startDate: dto.startDate,
    endDate: dto.endDate,
    isCanceled: dto.isCanceled
  };
}

export function mapRentalModelToDto(model: Rental): RentalDto {
  return {
    id: model.id || '',
    customerId: model.customer.dni,
    fullName: model.customer.fullName,
    address: model.customer.address,
    carType: model.car.type,
    model: model.car.model,
    location: model.car.location,
    startDate: model.startDate,
    endDate: model.endDate,
    isCanceled: model.isCanceled ?? false
  };
}

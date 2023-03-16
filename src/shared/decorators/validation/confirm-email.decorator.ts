import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../entities/users/users.repository';

@ValidatorConstraint({ name: 'confirmationCode', async: true })
@Injectable()
export class IsConfirmationCodeCorrect implements ValidatorConstraintInterface {
  constructor(protected usersRepository: UsersRepository) {}
  async validate(code: string, args: ValidationArguments) {
    const userInstance = await this.usersRepository.findUserByConfirmationCode(code);
    if (!userInstance) {
      return false;
    }
    if (userInstance.emailConfirmation.isConfirmed) {
      return false;
    }
    if (userInstance.emailConfirmation.confirmationCode !== code) {
      return false;
    }
    if (userInstance.emailConfirmation.expirationDate < new Date()) {
      return false;
    }
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return `confirmation code expired, incorrect or email is already confirmed`;
  }
}

export function IsConfirmationCodeValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'confirmationCode',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsConfirmationCodeCorrect,
    });
  };
}

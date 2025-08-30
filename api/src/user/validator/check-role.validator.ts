import { InjectConnection } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RoleEntity } from '@Entities/role.entity';
import { Connection } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsNotExitsRoleConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() protected readonly connection: Connection) {}
  validate(role: any) {
    return this.connection
      .getRepository(RoleEntity)
      .findOne({
        where: {
          id: role?.id || 0,
        },
      })
      .then((user) => {
        if (user) return true;
        return false;
      });
  }
  defaultMessage() {
    return `role not exist`;
  }
}

export function IsNotExitsRole(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'checkRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotExitsRoleConstraint,
    });
  };
}

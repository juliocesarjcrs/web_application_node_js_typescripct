import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log('VALUE:::', value);
          return (
            value === 'admin' || value === 'employee' || value === 'everyone'
          );
        },
        defaultMessage(args: ValidationArguments) {
          console.log('Args:::', args);
          return `${args.property} must be either 'admin', 'employee' or 'everyone'`;
        },
      },
    });
  };
}

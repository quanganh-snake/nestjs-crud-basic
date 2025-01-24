import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextUpperCase implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text === text.toUpperCase(); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is upper case!';
  }
}
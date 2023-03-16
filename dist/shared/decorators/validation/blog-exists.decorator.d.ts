import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { BlogsRepository } from '../../../entities/blogs/blogs.repository';
export declare class IsBlogExistsDecorator implements ValidatorConstraintInterface {
    private blogsRepository;
    constructor(blogsRepository: BlogsRepository);
    validate(blogId: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsBlogExists(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;

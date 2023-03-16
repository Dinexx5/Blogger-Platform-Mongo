"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBlogExists = exports.IsBlogExistsDecorator = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const blogs_repository_1 = require("../../../entities/blogs/blogs.repository");
let IsBlogExistsDecorator = class IsBlogExistsDecorator {
    constructor(blogsRepository) {
        this.blogsRepository = blogsRepository;
    }
    async validate(blogId, args) {
        const blog = await this.blogsRepository.findBlogInstance(blogId);
        if (!blog || blog.blogOwnerInfo.userId)
            return false;
        return true;
    }
    defaultMessage(args) {
        return `Blog already bound or doesn't exist`;
    }
};
IsBlogExistsDecorator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsBlogExists', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository])
], IsBlogExistsDecorator);
exports.IsBlogExistsDecorator = IsBlogExistsDecorator;
function IsBlogExists(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsBlogExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsBlogExistsDecorator,
        });
    };
}
exports.IsBlogExists = IsBlogExists;
//# sourceMappingURL=blog-exists.decorator.js.map
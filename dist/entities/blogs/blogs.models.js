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
exports.blogSAViewModel = exports.blogViewModel = exports.blogAndUserParamModel = exports.blogAndPostParamModel = exports.BanBlogModel = exports.blogParamModel = void 0;
const class_validator_1 = require("class-validator");
const blog_exists_decorator_1 = require("../../shared/decorators/validation/blog-exists.decorator");
const user_exists_decorator_1 = require("../../shared/decorators/validation/user-exists.decorator");
class blogParamModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], blogParamModel.prototype, "blogId", void 0);
exports.blogParamModel = blogParamModel;
class BanBlogModel {
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], BanBlogModel.prototype, "isBanned", void 0);
exports.BanBlogModel = BanBlogModel;
class blogAndPostParamModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], blogAndPostParamModel.prototype, "blogId", void 0);
exports.blogAndPostParamModel = blogAndPostParamModel;
class blogAndUserParamModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, blog_exists_decorator_1.IsBlogExists)(),
    __metadata("design:type", String)
], blogAndUserParamModel.prototype, "blogId", void 0);
__decorate([
    (0, user_exists_decorator_1.IsUserExists)(),
    __metadata("design:type", String)
], blogAndUserParamModel.prototype, "userId", void 0);
exports.blogAndUserParamModel = blogAndUserParamModel;
class blogViewModel {
    constructor(id, name, description, isMembership, websiteUrl, createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isMembership = isMembership;
        this.websiteUrl = websiteUrl;
        this.createdAt = createdAt;
    }
}
exports.blogViewModel = blogViewModel;
class blogSAViewModel {
    constructor(id, name, description, isMembership, websiteUrl, createdAt, blogOwnerInfo, banInfo) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isMembership = isMembership;
        this.websiteUrl = websiteUrl;
        this.createdAt = createdAt;
        this.blogOwnerInfo = blogOwnerInfo;
        this.banInfo = banInfo;
    }
}
exports.blogSAViewModel = blogSAViewModel;
//# sourceMappingURL=blogs.models.js.map
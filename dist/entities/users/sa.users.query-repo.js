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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaUsersQueryRepository = void 0;
const users_schema_1 = require("./users.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
function mapDbUserToUserViewModel(user) {
    return {
        id: user._id.toString(),
        login: user.accountData.login,
        email: user.accountData.email,
        createdAt: user.accountData.createdAt,
        banInfo: {
            isBanned: user.banInfo.isBanned,
            banDate: user.banInfo.banDate,
            banReason: user.banInfo.banReason,
        },
    };
}
let SaUsersQueryRepository = class SaUsersQueryRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllUsers(query) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10, searchLoginTerm = null, searchEmailTerm = null, banStatus = 'all', } = query;
        const sortByFilter = `accountData.${sortBy}`;
        const sortDirectionInt = sortDirection === 'desc' ? -1 : 1;
        const skippedUsersCount = (+pageNumber - 1) * +pageSize;
        const banSearchTerm = banStatus === 'all' ? 'whatever' : banStatus === 'banned' ? true : false;
        const filter = {};
        if (banSearchTerm === true || banSearchTerm === false) {
            filter['banInfo.isBanned'] = banSearchTerm;
        }
        if (searchLoginTerm) {
            filter['accountData.login'] = { $regex: searchLoginTerm, $options: 'i' };
        }
        if (searchEmailTerm) {
            filter['accountData.email'] = { $regex: searchEmailTerm, $options: 'i' };
        }
        const countAll = await this.userModel.countDocuments(filter);
        const usersDb = await this.userModel
            .find(filter)
            .sort({ [sortByFilter]: sortDirectionInt })
            .skip(skippedUsersCount)
            .limit(+pageSize);
        const usersView = usersDb.map(mapDbUserToUserViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: usersView,
        };
    }
};
SaUsersQueryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SaUsersQueryRepository);
exports.SaUsersQueryRepository = SaUsersQueryRepository;
//# sourceMappingURL=sa.users.query-repo.js.map
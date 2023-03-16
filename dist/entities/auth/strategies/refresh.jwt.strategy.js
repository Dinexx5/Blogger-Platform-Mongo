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
exports.RefreshJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const token_repository_1 = require("../../tokens/token.repository");
let RefreshJwtStrategy = class RefreshJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(tokenRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => {
                    const token = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
                    if (!token) {
                        return null;
                    }
                    return token;
                },
            ]),
            secretOrKey: process.env.REFRESH_SECRET,
            passReqToCallback: true,
        });
        this.tokenRepository = tokenRepository;
    }
    async validate(req, payload) {
        const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        const expiredAt = new Date(payload.exp * 1000).toISOString();
        const token = await this.tokenRepository.findToken(expiredAt);
        console.log(token);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return Object.assign(Object.assign({}, payload), { refreshToken });
    }
};
RefreshJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository])
], RefreshJwtStrategy);
exports.RefreshJwtStrategy = RefreshJwtStrategy;
//# sourceMappingURL=refresh.jwt.strategy.js.map
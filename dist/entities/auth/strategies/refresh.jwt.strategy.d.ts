import { Request } from 'express';
import { TokenRepository } from '../../tokens/token.repository';
declare const RefreshJwtStrategy_base: new (...args: any[]) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private readonly tokenRepository;
    constructor(tokenRepository: TokenRepository);
    validate(req: Request, payload: any): Promise<any>;
}
export {};

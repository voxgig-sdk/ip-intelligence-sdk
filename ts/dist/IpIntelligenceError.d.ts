import { Context } from './Context';
declare class IpIntelligenceError extends Error {
    isIpIntelligenceError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IpIntelligenceError };

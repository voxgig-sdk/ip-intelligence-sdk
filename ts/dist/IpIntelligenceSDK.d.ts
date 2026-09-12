import { ApiEntity } from './entity/ApiEntity';
import { UsageEntity } from './entity/UsageEntity';
export type * from './IpIntelligenceTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IpIntelligenceEntityBase } from './IpIntelligenceEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class IpIntelligenceSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Api(entopts?: Record<string, any>): ApiEntity;
    Usage(entopts?: Record<string, any>): UsageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IpIntelligenceSDK;
    tester(testopts?: any, sdkopts?: any): IpIntelligenceSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IpIntelligenceSDK;
export { stdutil, config, BaseFeature, IpIntelligenceEntityBase, IpIntelligenceSDK, SDK, };

import { IpIntelligenceEntityBase } from '../IpIntelligenceEntityBase';
import type { IpIntelligenceSDK } from '../IpIntelligenceSDK';
import type { Control } from '../types';
import type { Usage, UsageLoadMatch } from '../IpIntelligenceTypes';
declare class UsageEntity extends IpIntelligenceEntityBase<Usage> {
    constructor(client: IpIntelligenceSDK, entopts: any);
    make(this: UsageEntity): UsageEntity;
    load(this: any, reqmatch?: UsageLoadMatch, ctrl?: Control): Promise<UsageEntity>;
}
export { UsageEntity };

import { IpIntelligenceEntityBase } from '../IpIntelligenceEntityBase';
import type { IpIntelligenceSDK } from '../IpIntelligenceSDK';
import type { Control } from '../types';
import type { Api, ApiLoadMatch } from '../IpIntelligenceTypes';
declare class ApiEntity extends IpIntelligenceEntityBase<Api> {
    constructor(client: IpIntelligenceSDK, entopts: any);
    make(this: ApiEntity): ApiEntity;
    load(this: any, reqmatch?: ApiLoadMatch, ctrl?: Control): Promise<ApiEntity>;
}
export { ApiEntity };

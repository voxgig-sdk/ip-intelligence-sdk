export interface Api {
    asn_handle: string;
    asn_id: number;
    country_code: string;
    country_name: string;
    id?: string;
    ip: string;
    is: any[];
    malicious?: Record<string, any>;
    metadata?: Record<string, any>;
    trust_score: number;
}
export interface ApiLoadMatch {
    id: string;
    api_key?: string;
}
export interface Usage {
    account_level: string;
    current_usage: number;
    monthly_limit: number;
    next_reset: string;
    remaining_requests: number;
    usage_percentage: number;
}
export interface UsageLoadMatch {
    account_level?: string;
    current_usage?: number;
    monthly_limit?: number;
    next_reset?: string;
    remaining_requests?: number;
    usage_percentage?: number;
}

// Typed models for the IpIntelligence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Api {
  asn_handle: string
  asn_id: number
  country_code: string
  country_name: string
  ip: string
  is: any[]
  malicious?: Record<string, any>
  metadata?: Record<string, any>
  trust_score: number
}

export interface ApiLoadMatch {
  id: string
}

export interface Usage {
  account_level: string
  current_usage: number
  monthly_limit: number
  next_reset: string
  remaining_request: number
  usage_percentage: number
}

export type UsageLoadMatch = Partial<Usage>


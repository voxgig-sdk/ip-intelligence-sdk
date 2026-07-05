// Typed models for the IpIntelligence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Api is the typed data model for the api entity.
type Api struct {
	AsnHandle string `json:"asn_handle"`
	AsnId int `json:"asn_id"`
	CountryCode string `json:"country_code"`
	CountryName string `json:"country_name"`
	Ip string `json:"ip"`
	Is []any `json:"is"`
	Malicious *map[string]any `json:"malicious,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	TrustScore int `json:"trust_score"`
}

// ApiLoadMatch is the typed request payload for Api.LoadTyped.
type ApiLoadMatch struct {
	Id string `json:"id"`
}

// Usage is the typed data model for the usage entity.
type Usage struct {
	AccountLevel string `json:"account_level"`
	CurrentUsage int `json:"current_usage"`
	MonthlyLimit int `json:"monthly_limit"`
	NextReset string `json:"next_reset"`
	RemainingRequest int `json:"remaining_request"`
	UsagePercentage float64 `json:"usage_percentage"`
}

// UsageLoadMatch is the typed request payload for Usage.LoadTyped.
type UsageLoadMatch struct {
	AccountLevel *string `json:"account_level,omitempty"`
	CurrentUsage *int `json:"current_usage,omitempty"`
	MonthlyLimit *int `json:"monthly_limit,omitempty"`
	NextReset *string `json:"next_reset,omitempty"`
	RemainingRequest *int `json:"remaining_request,omitempty"`
	UsagePercentage *float64 `json:"usage_percentage,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

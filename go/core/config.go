package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "IpIntelligence",
			"slug": "ip-intelligence",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://addr.zone",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-Key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"api": map[string]any{},
				"usage": map[string]any{},
			},
		},
		"entity": map[string]any{
			"api": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asn_handle",
						"title": "Asn Handle",
						"type": "`$STRING`",
						"req": true,
						"short": "Network operator name/handle",
					},
					map[string]any{
						"name": "asn_id",
						"title": "Asn Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Autonomous System Number of the network operator",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Two-letter ISO country code",
					},
					map[string]any{
						"name": "country_name",
						"title": "Country Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Full country name",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
						"short": "The IP address that was analyzed",
						"format": "ipv4",
					},
					map[string]any{
						"name": "is",
						"title": "Is",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of classifications for this IP.",
					},
					map[string]any{
						"name": "malicious",
						"title": "Malicious",
						"type": "`$OBJECT`",
						"short": "Information about malicious activity if IP is flagged",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Additional contextual information about the IP, structure varies based on classifications",
					},
					map[string]any{
						"name": "trust_score",
						"title": "Trust Score",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Trust rating from 0-10, where 10 is most trustworthy.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "api",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1.1.1.1",
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "zone_your_api_key_here",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"usage": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_level",
						"title": "Account Level",
						"type": "`$STRING`",
						"req": true,
						"short": "Account tier level",
					},
					map[string]any{
						"name": "current_usage",
						"title": "Current Usage",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of API requests used in the current billing period",
					},
					map[string]any{
						"name": "monthly_limit",
						"title": "Monthly Limit",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Total monthly request limit for this account",
					},
					map[string]any{
						"name": "next_reset",
						"title": "Next Reset",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO 8601 timestamp when the usage counter resets",
						"format": "date-time",
					},
					map[string]any{
						"name": "remaining_requests",
						"title": "Remaining Requests",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of requests remaining in the current billing period",
					},
					map[string]any{
						"name": "usage_percentage",
						"title": "Usage Percentage",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Percentage of monthly limit used",
						"format": "float",
					},
				},
				"name": "usage",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/usage",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "usage",
									},
								},
								"parts": []any{
									"api",
									"usage",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

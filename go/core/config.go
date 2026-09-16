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
						"req": true,
						"short": "Network operator name/handle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asn_id",
						"req": true,
						"short": "Autonomous System Number of the network operator",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"short": "Two-letter ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"req": true,
						"short": "Full country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "ipv4",
						"name": "ip",
						"req": true,
						"short": "The IP address that was analyzed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is",
						"req": true,
						"short": "Array of classifications for this IP.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "malicious",
						"short": "Information about malicious activity if IP is flagged",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"short": "Additional contextual information about the IP, structure varies based on classifications",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "trust_score",
						"req": true,
						"short": "Trust rating from 0-10, where 10 is most trustworthy.",
						"type": "`$INTEGER`",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "1.1.1.1",
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "zone_your_api_key_here",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"{id}",
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
						"req": true,
						"short": "Account tier level",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "current_usage",
						"req": true,
						"short": "Number of API requests used in the current billing period",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "monthly_limit",
						"req": true,
						"short": "Total monthly request limit for this account",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "next_reset",
						"req": true,
						"short": "ISO 8601 timestamp when the usage counter resets",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "remaining_requests",
						"req": true,
						"short": "Number of requests remaining in the current billing period",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "float",
						"name": "usage_percentage",
						"req": true,
						"short": "Percentage of monthly limit used",
						"type": "`$NUMBER`",
					},
				},
				"name": "usage",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
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
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"usage",
								},
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

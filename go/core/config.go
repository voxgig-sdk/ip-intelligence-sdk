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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asn_id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "malicious",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "trust_score",
						"req": true,
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"api",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "current_usage",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "monthly_limit",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "next_reset",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "remaining_requests",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "usage_percentage",
						"req": true,
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
								"parts": []any{
									"api",
									"usage",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

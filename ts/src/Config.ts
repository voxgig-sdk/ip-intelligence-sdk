
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'IpIntelligence',
        slug: "ip-intelligence",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://addr.zone",

    auth: {
      prefix: '',
      name: 'X-API-Key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        api: {
        },
  
        usage: {
        },
  
    }
  }


  entity = {
    "api": {
      "fields": [
        {
          "name": "asn_handle",
          "title": "Asn Handle",
          "type": "`$STRING`",
          "req": true,
          "short": "Network operator name/handle"
        },
        {
          "name": "asn_id",
          "title": "Asn Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Autonomous System Number of the network operator"
        },
        {
          "name": "country_code",
          "title": "Country Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Two-letter ISO country code"
        },
        {
          "name": "country_name",
          "title": "Country Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Full country name"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "title": "Ip",
          "type": "`$STRING`",
          "req": true,
          "short": "The IP address that was analyzed",
          "format": "ipv4"
        },
        {
          "name": "is",
          "title": "Is",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of classifications for this IP."
        },
        {
          "name": "malicious",
          "title": "Malicious",
          "type": "`$OBJECT`",
          "short": "Information about malicious activity if IP is flagged"
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`",
          "short": "Additional contextual information about the IP, structure varies based on classifications"
        },
        {
          "name": "trust_score",
          "title": "Trust Score",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Trust rating from 0-10, where 10 is most trustworthy."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "api",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/{ip}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "ip",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "1.1.1.1"
                  }
                ],
                "query": [
                  {
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "zone_your_api_key_here"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "usage": {
      "fields": [
        {
          "name": "account_level",
          "title": "Account Level",
          "type": "`$STRING`",
          "req": true,
          "short": "Account tier level"
        },
        {
          "name": "current_usage",
          "title": "Current Usage",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of API requests used in the current billing period"
        },
        {
          "name": "monthly_limit",
          "title": "Monthly Limit",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Total monthly request limit for this account"
        },
        {
          "name": "next_reset",
          "title": "Next Reset",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp when the usage counter resets",
          "format": "date-time"
        },
        {
          "name": "remaining_requests",
          "title": "Remaining Requests",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of requests remaining in the current billing period"
        },
        {
          "name": "usage_percentage",
          "title": "Usage Percentage",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Percentage of monthly limit used",
          "format": "float"
        }
      ],
      "name": "usage",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/usage",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "usage"
                }
              ],
              "parts": [
                "api",
                "usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


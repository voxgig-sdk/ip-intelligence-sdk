
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://addr.zone",

    auth: {
      prefix: '',
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
          "req": true,
          "short": "Network operator name/handle",
          "type": "`$STRING`"
        },
        {
          "name": "asn_id",
          "req": true,
          "short": "Autonomous System Number of the network operator",
          "type": "`$INTEGER`"
        },
        {
          "name": "country_code",
          "req": true,
          "short": "Two-letter ISO country code",
          "type": "`$STRING`"
        },
        {
          "name": "country_name",
          "req": true,
          "short": "Full country name",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "short": "The IP address that was analyzed",
          "type": "`$STRING`"
        },
        {
          "name": "is",
          "req": true,
          "short": "Array of classifications for this IP.",
          "type": "`$ARRAY`"
        },
        {
          "name": "malicious",
          "short": "Information about malicious activity if IP is flagged",
          "type": "`$OBJECT`"
        },
        {
          "name": "metadata",
          "short": "Additional contextual information about the IP, structure varies based on classifications",
          "type": "`$OBJECT`"
        },
        {
          "name": "trust_score",
          "req": true,
          "short": "Trust rating from 0-10, where 10 is most trustworthy.",
          "type": "`$INTEGER`"
        }
      ],
      "name": "api",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "1.1.1.1",
                    "kind": "param",
                    "name": "id",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "zone_your_api_key_here",
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/{ip}",
              "parts": [
                "api",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "api_key",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "req": true,
          "short": "Account tier level",
          "type": "`$STRING`"
        },
        {
          "name": "current_usage",
          "req": true,
          "short": "Number of API requests used in the current billing period",
          "type": "`$INTEGER`"
        },
        {
          "name": "monthly_limit",
          "req": true,
          "short": "Total monthly request limit for this account",
          "type": "`$INTEGER`"
        },
        {
          "name": "next_reset",
          "req": true,
          "short": "ISO 8601 timestamp when the usage counter resets",
          "type": "`$STRING`"
        },
        {
          "name": "remaining_requests",
          "req": true,
          "short": "Number of requests remaining in the current billing period",
          "type": "`$INTEGER`"
        },
        {
          "name": "usage_percentage",
          "req": true,
          "short": "Percentage of monthly limit used",
          "type": "`$NUMBER`"
        }
      ],
      "name": "usage",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/usage",
              "parts": [
                "api",
                "usage"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}


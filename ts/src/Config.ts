
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


  main = {
    name: 'IpIntelligence',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "asn_id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "country_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "is",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "malicious",
          "type": "`$OBJECT`"
        },
        {
          "name": "metadata",
          "type": "`$OBJECT`"
        },
        {
          "name": "trust_score",
          "req": true,
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
          "type": "`$STRING`"
        },
        {
          "name": "current_usage",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "monthly_limit",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "next_reset",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "remaining_requests",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "usage_percentage",
          "req": true,
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


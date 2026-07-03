# IpIntelligence SDK configuration


def make_config():
    return {
        "main": {
            "name": "IpIntelligence",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://addr.zone",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api": {},
                "usage": {},
            },
        },
        "entity": {
      "api": {
        "fields": [
          {
            "active": True,
            "name": "asn_handle",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "asn_id",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "is",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "malicious",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "metadata",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "trust_score",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 8,
          },
        ],
        "name": "api",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "1.1.1.1",
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": "zone_your_api_key_here",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/{ip}",
                "parts": [
                  "api",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "api_key",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "usage": {
        "fields": [
          {
            "active": True,
            "name": "account_level",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "current_usage",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "monthly_limit",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "next_reset",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "remaining_request",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "usage_percentage",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 5,
          },
        ],
        "name": "usage",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/usage",
                "parts": [
                  "api",
                  "usage",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

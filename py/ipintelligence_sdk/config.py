# IpIntelligence SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IpIntelligence",
            "slug": "ip-intelligence",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://addr.zone",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
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
            "name": "asn_handle",
            "req": True,
            "short": "Network operator name/handle",
            "type": "`$STRING`",
          },
          {
            "name": "asn_id",
            "req": True,
            "short": "Autonomous System Number of the network operator",
            "type": "`$INTEGER`",
          },
          {
            "name": "country_code",
            "req": True,
            "short": "Two-letter ISO country code",
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "short": "Full country name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "format": "ipv4",
            "name": "ip",
            "req": True,
            "short": "The IP address that was analyzed",
            "type": "`$STRING`",
          },
          {
            "name": "is",
            "req": True,
            "short": "Array of classifications for this IP.",
            "type": "`$ARRAY`",
          },
          {
            "name": "malicious",
            "short": "Information about malicious activity if IP is flagged",
            "type": "`$OBJECT`",
          },
          {
            "name": "metadata",
            "short": "Additional contextual information about the IP, structure varies based on classifications",
            "type": "`$OBJECT`",
          },
          {
            "name": "trust_score",
            "req": True,
            "short": "Trust rating from 0-10, where 10 is most trustworthy.",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "zone_your_api_key_here",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/{ip}",
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "parts": [
                  "api",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "usage": {
        "fields": [
          {
            "name": "account_level",
            "req": True,
            "short": "Account tier level",
            "type": "`$STRING`",
          },
          {
            "name": "current_usage",
            "req": True,
            "short": "Number of API requests used in the current billing period",
            "type": "`$INTEGER`",
          },
          {
            "name": "monthly_limit",
            "req": True,
            "short": "Total monthly request limit for this account",
            "type": "`$INTEGER`",
          },
          {
            "format": "date-time",
            "name": "next_reset",
            "req": True,
            "short": "ISO 8601 timestamp when the usage counter resets",
            "type": "`$STRING`",
          },
          {
            "name": "remaining_requests",
            "req": True,
            "short": "Number of requests remaining in the current billing period",
            "type": "`$INTEGER`",
          },
          {
            "format": "float",
            "name": "usage_percentage",
            "req": True,
            "short": "Percentage of monthly limit used",
            "type": "`$NUMBER`",
          },
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
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "usage",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "usage",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

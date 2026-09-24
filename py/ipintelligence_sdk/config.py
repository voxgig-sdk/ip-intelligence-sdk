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
            "title": "Asn Handle",
            "type": "`$STRING`",
            "req": True,
            "short": "Network operator name/handle",
          },
          {
            "name": "asn_id",
            "title": "Asn Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Autonomous System Number of the network operator",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Two-letter ISO country code",
          },
          {
            "name": "country_name",
            "title": "Country Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Full country name",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "req": True,
            "short": "The IP address that was analyzed",
            "format": "ipv4",
          },
          {
            "name": "is",
            "title": "Is",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of classifications for this IP.",
          },
          {
            "name": "malicious",
            "title": "Malicious",
            "type": "`$OBJECT`",
            "short": "Information about malicious activity if IP is flagged",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "Additional contextual information about the IP, structure varies based on classifications",
          },
          {
            "name": "trust_score",
            "title": "Trust Score",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Trust rating from 0-10, where 10 is most trustworthy.",
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
                "kind": "http",
                "method": "GET",
                "orig": "/api/{ip}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "ip",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "1.1.1.1",
                    },
                  ],
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "zone_your_api_key_here",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "api_key",
                    "id",
                  ],
                },
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
            "title": "Account Level",
            "type": "`$STRING`",
            "req": True,
            "short": "Account tier level",
          },
          {
            "name": "current_usage",
            "title": "Current Usage",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of API requests used in the current billing period",
          },
          {
            "name": "monthly_limit",
            "title": "Monthly Limit",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Total monthly request limit for this account",
          },
          {
            "name": "next_reset",
            "title": "Next Reset",
            "type": "`$STRING`",
            "req": True,
            "short": "ISO 8601 timestamp when the usage counter resets",
            "format": "date-time",
          },
          {
            "name": "remaining_requests",
            "title": "Remaining Requests",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of requests remaining in the current billing period",
          },
          {
            "name": "usage_percentage",
            "title": "Usage Percentage",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Percentage of monthly limit used",
            "format": "float",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "usage",
                  },
                ],
                "parts": [
                  "api",
                  "usage",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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

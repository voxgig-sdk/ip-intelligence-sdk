# IpIntelligence SDK configuration


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
                "prefix": "",
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
            "type": "`$STRING`",
          },
          {
            "name": "asn_id",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "is",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "malicious",
            "type": "`$OBJECT`",
          },
          {
            "name": "metadata",
            "type": "`$OBJECT`",
          },
          {
            "name": "trust_score",
            "req": True,
            "type": "`$INTEGER`",
          },
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
            "type": "`$STRING`",
          },
          {
            "name": "current_usage",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "monthly_limit",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "next_reset",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "remaining_requests",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "usage_percentage",
            "req": True,
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
                "parts": [
                  "api",
                  "usage",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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

-- IpIntelligence SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "IpIntelligence",
      slug = "ip-intelligence",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://addr.zone",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["api"] = {},
        ["usage"] = {},
      },
    },
    entity = {
      ["api"] = {
        ["fields"] = {
          {
            ["name"] = "asn_handle",
            ["req"] = true,
            ["short"] = "Network operator name/handle",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "asn_id",
            ["req"] = true,
            ["short"] = "Autonomous System Number of the network operator",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "country_code",
            ["req"] = true,
            ["short"] = "Two-letter ISO country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_name",
            ["req"] = true,
            ["short"] = "Full country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "ipv4",
            ["name"] = "ip",
            ["req"] = true,
            ["short"] = "The IP address that was analyzed",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is",
            ["req"] = true,
            ["short"] = "Array of classifications for this IP.",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "malicious",
            ["short"] = "Information about malicious activity if IP is flagged",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "metadata",
            ["short"] = "Additional contextual information about the IP, structure varies based on classifications",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "trust_score",
            ["req"] = true,
            ["short"] = "Trust rating from 0-10, where 10 is most trustworthy.",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "api",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "1.1.1.1",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "ip",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "zone_your_api_key_here",
                      ["kind"] = "query",
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/{ip}",
                ["rename"] = {
                  ["param"] = {
                    ["ip"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "api_key",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["usage"] = {
        ["fields"] = {
          {
            ["name"] = "account_level",
            ["req"] = true,
            ["short"] = "Account tier level",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "current_usage",
            ["req"] = true,
            ["short"] = "Number of API requests used in the current billing period",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "monthly_limit",
            ["req"] = true,
            ["short"] = "Total monthly request limit for this account",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "next_reset",
            ["req"] = true,
            ["short"] = "ISO 8601 timestamp when the usage counter resets",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "remaining_requests",
            ["req"] = true,
            ["short"] = "Number of requests remaining in the current billing period",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "float",
            ["name"] = "usage_percentage",
            ["req"] = true,
            ["short"] = "Percentage of monthly limit used",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "usage",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/usage",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "usage",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "usage",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config

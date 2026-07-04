# IpIntelligence SDK configuration

module IpIntelligenceConfig
  def self.make_config
    {
      "main" => {
        "name" => "IpIntelligence",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://addr.zone",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "api" => {},
          "usage" => {},
        },
      },
      "entity" => {
        "api" => {
          "fields" => [
            {
              "active" => true,
              "name" => "asn_handle",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "asn_id",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "country_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "country_name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "is",
              "req" => true,
              "type" => "`$ARRAY`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "malicious",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "metadata",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "trust_score",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 8,
            },
          ],
          "name" => "api",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "1.1.1.1",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "example" => "zone_your_api_key_here",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/{ip}",
                  "parts" => [
                    "api",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "usage" => {
          "fields" => [
            {
              "active" => true,
              "name" => "account_level",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "current_usage",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "monthly_limit",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "next_reset",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "remaining_request",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "usage_percentage",
              "req" => true,
              "type" => "`$NUMBER`",
              "index$" => 5,
            },
          ],
          "name" => "usage",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/api/usage",
                  "parts" => [
                    "api",
                    "usage",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IpIntelligenceFeatures.make_feature(name)
  end
end

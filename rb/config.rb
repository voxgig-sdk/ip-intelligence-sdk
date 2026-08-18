# IpIntelligence SDK configuration

module IpIntelligenceConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
          "prefix" => "",
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
              "name" => "asn_handle",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "asn_id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "country_code",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "country_name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "is",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "malicious",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "metadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "trust_score",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "api",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "1.1.1.1",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "zone_your_api_key_here",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "usage" => {
          "fields" => [
            {
              "name" => "account_level",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "current_usage",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "monthly_limit",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "next_reset",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "remaining_requests",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "usage_percentage",
              "req" => true,
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "usage",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
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
                },
              ],
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

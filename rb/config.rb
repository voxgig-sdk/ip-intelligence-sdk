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
        "slug" => "ip-intelligence",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "Network operator name/handle",
              "type" => "`$STRING`",
            },
            {
              "name" => "asn_id",
              "req" => true,
              "short" => "Autonomous System Number of the network operator",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "country_code",
              "req" => true,
              "short" => "Two-letter ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_name",
              "req" => true,
              "short" => "Full country name",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "format" => "ipv4",
              "name" => "ip",
              "req" => true,
              "short" => "The IP address that was analyzed",
              "type" => "`$STRING`",
            },
            {
              "name" => "is",
              "req" => true,
              "short" => "Array of classifications for this IP.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "malicious",
              "short" => "Information about malicious activity if IP is flagged",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "metadata",
              "short" => "Additional contextual information about the IP, structure varies based on classifications",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "trust_score",
              "req" => true,
              "short" => "Trust rating from 0-10, where 10 is most trustworthy.",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "parts" => [
                    "api",
                    "{id}",
                  ],
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
              "short" => "Account tier level",
              "type" => "`$STRING`",
            },
            {
              "name" => "current_usage",
              "req" => true,
              "short" => "Number of API requests used in the current billing period",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "monthly_limit",
              "req" => true,
              "short" => "Total monthly request limit for this account",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "date-time",
              "name" => "next_reset",
              "req" => true,
              "short" => "ISO 8601 timestamp when the usage counter resets",
              "type" => "`$STRING`",
            },
            {
              "name" => "remaining_requests",
              "req" => true,
              "short" => "Number of requests remaining in the current billing period",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "float",
              "name" => "usage_percentage",
              "req" => true,
              "short" => "Percentage of monthly limit used",
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
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "usage",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "usage",
                  ],
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

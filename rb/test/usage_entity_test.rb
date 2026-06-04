# Usage entity test

require "minitest/autorun"
require "json"
require_relative "../IpIntelligence_sdk"
require_relative "runner"

class UsageEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IpIntelligenceSDK.test(nil, nil)
    ent = testsdk.Usage(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = usage_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "usage." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IPINTELLIGENCE_TEST_USAGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    usage_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.usage")))
    usage_ref01_data = nil
    if usage_ref01_data_raw.length > 0
      usage_ref01_data = Helpers.to_map(usage_ref01_data_raw[0][1])
    end

    # LOAD
    usage_ref01_ent = client.Usage(nil)
    usage_ref01_match_dt0 = {}
    usage_ref01_data_dt0_loaded, err = usage_ref01_ent.load(usage_ref01_match_dt0, nil)
    assert_nil err
    assert !usage_ref01_data_dt0_loaded.nil?

  end
end

def usage_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "usage", "UsageTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IpIntelligenceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["usage01", "usage02", "usage03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["IPINTELLIGENCE_TEST_USAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IPINTELLIGENCE_TEST_USAGE_ENTID" => idmap,
    "IPINTELLIGENCE_TEST_LIVE" => "FALSE",
    "IPINTELLIGENCE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["IPINTELLIGENCE_TEST_USAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IPINTELLIGENCE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = IpIntelligenceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IPINTELLIGENCE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IPINTELLIGENCE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end

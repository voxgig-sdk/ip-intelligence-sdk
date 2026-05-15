# IpIntelligence SDK exists test

require "minitest/autorun"
require_relative "../IpIntelligence_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IpIntelligenceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

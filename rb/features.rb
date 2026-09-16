# IpIntelligence SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IpIntelligenceFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpIntelligenceBaseFeature.new
    when "ratelimit"
      IpIntelligenceRatelimitFeature.new
    when "retry"
      IpIntelligenceRetryFeature.new
    when "test"
      IpIntelligenceTestFeature.new
    when "timeout"
      IpIntelligenceTimeoutFeature.new
    else
      IpIntelligenceBaseFeature.new
    end
  end
end

# IpIntelligence SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IpIntelligenceFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpIntelligenceBaseFeature.new
    when "test"
      IpIntelligenceTestFeature.new
    else
      IpIntelligenceBaseFeature.new
    end
  end
end

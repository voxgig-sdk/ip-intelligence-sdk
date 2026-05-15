# IpIntelligence SDK utility: make_context
require_relative '../core/context'
module IpIntelligenceUtilities
  MakeContext = ->(ctxmap, basectx) {
    IpIntelligenceContext.new(ctxmap, basectx)
  }
end

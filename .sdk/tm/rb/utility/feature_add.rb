# IpIntelligence SDK utility: feature_add
module IpIntelligenceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end

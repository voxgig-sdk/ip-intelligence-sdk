package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewApiEntityFunc func(client *IpIntelligenceSDK, entopts map[string]any) IpIntelligenceEntity

var NewUsageEntityFunc func(client *IpIntelligenceSDK, entopts map[string]any) IpIntelligenceEntity


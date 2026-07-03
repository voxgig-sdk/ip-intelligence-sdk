package voxgigipintelligencesdk

import (
	"github.com/voxgig-sdk/ip-intelligence-sdk/go/core"
	"github.com/voxgig-sdk/ip-intelligence-sdk/go/entity"
	"github.com/voxgig-sdk/ip-intelligence-sdk/go/feature"
	_ "github.com/voxgig-sdk/ip-intelligence-sdk/go/utility"
)

// Type aliases preserve external API.
type IpIntelligenceSDK = core.IpIntelligenceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IpIntelligenceEntity = core.IpIntelligenceEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IpIntelligenceError = core.IpIntelligenceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewApiEntityFunc = func(client *core.IpIntelligenceSDK, entopts map[string]any) core.IpIntelligenceEntity {
		return entity.NewApiEntity(client, entopts)
	}
	core.NewUsageEntityFunc = func(client *core.IpIntelligenceSDK, entopts map[string]any) core.IpIntelligenceEntity {
		return entity.NewUsageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIpIntelligenceSDK = core.NewIpIntelligenceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIpIntelligenceSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IpIntelligenceSDK  { return NewIpIntelligenceSDK(nil) }
func Test() *IpIntelligenceSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

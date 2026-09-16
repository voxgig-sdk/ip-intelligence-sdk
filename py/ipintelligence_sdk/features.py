# IpIntelligence SDK feature factory

from ipintelligence_sdk.feature.base_feature import IpIntelligenceBaseFeature
from ipintelligence_sdk.feature.ratelimit_feature import IpIntelligenceRatelimitFeature
from ipintelligence_sdk.feature.retry_feature import IpIntelligenceRetryFeature
from ipintelligence_sdk.feature.test_feature import IpIntelligenceTestFeature
from ipintelligence_sdk.feature.timeout_feature import IpIntelligenceTimeoutFeature


_FEATURES = {
    "base": lambda: IpIntelligenceBaseFeature(),
    "ratelimit": lambda: IpIntelligenceRatelimitFeature(),
    "retry": lambda: IpIntelligenceRetryFeature(),
    "test": lambda: IpIntelligenceTestFeature(),
    "timeout": lambda: IpIntelligenceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

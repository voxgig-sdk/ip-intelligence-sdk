# IpIntelligence SDK feature factory

from ipintelligence_sdk.feature.base_feature import IpIntelligenceBaseFeature
from ipintelligence_sdk.feature.test_feature import IpIntelligenceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpIntelligenceBaseFeature(),
        "test": lambda: IpIntelligenceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

# ProjectName SDK exists test

import pytest
from ipintelligence_sdk import IpIntelligenceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IpIntelligenceSDK.test(None, None)
        assert testsdk is not None

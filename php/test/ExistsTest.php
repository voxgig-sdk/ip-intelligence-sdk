<?php
declare(strict_types=1);

// IpIntelligence SDK exists test

require_once __DIR__ . '/../ipintelligence_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IpIntelligenceSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}

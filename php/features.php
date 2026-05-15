<?php
declare(strict_types=1);

// IpIntelligence SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IpIntelligenceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IpIntelligenceBaseFeature();
            case "test":
                return new IpIntelligenceTestFeature();
            default:
                return new IpIntelligenceBaseFeature();
        }
    }
}

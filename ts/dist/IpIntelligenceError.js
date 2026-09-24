"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpIntelligenceError = void 0;
class IpIntelligenceError extends Error {
    isIpIntelligenceError = true;
    sdk = 'IpIntelligence';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IpIntelligenceError = IpIntelligenceError;
//# sourceMappingURL=IpIntelligenceError.js.map
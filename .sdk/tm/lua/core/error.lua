-- IpIntelligence SDK error

local IpIntelligenceError = {}
IpIntelligenceError.__index = IpIntelligenceError


function IpIntelligenceError.new(code, msg, ctx)
  local self = setmetatable({}, IpIntelligenceError)
  self.is_sdk_error = true
  self.sdk = "IpIntelligence"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IpIntelligenceError:error()
  return self.msg
end


function IpIntelligenceError:__tostring()
  return self.msg
end


return IpIntelligenceError

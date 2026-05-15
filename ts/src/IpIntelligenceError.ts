
import { Context } from './Context'


class IpIntelligenceError extends Error {

  isIpIntelligenceError = true

  sdk = 'IpIntelligence'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IpIntelligenceError
}


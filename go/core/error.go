package core

type IpIntelligenceError struct {
	IsIpIntelligenceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIpIntelligenceError(code string, msg string, ctx *Context) *IpIntelligenceError {
	return &IpIntelligenceError{
		IsIpIntelligenceError: true,
		Sdk:              "IpIntelligence",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IpIntelligenceError) Error() string {
	return e.Msg
}

import Joi from'joi';


const registerAuthSchema = Joi.object({
  name:Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  subscription: Joi.string(),
  password:Joi.string().required()
})

const loginAuthSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password:Joi.string().required()
})
const updateSubscriptionShema=Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const sellCArShema = Joi.object({
  brend:Joi.string().required(),
  model: Joi.string().required(),
  generation: Joi.string(),
  motorCapacity:Joi.number().required(),
  power:Joi.string(),
  carLicenseplane:Joi.string().required()

})

export {
  registerAuthSchema,
  loginAuthSchema,
  updateSubscriptionShema,
  sellCArShema
}
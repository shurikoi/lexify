import Token from "../models/Token.js"
import jwt from "jsonwebtoken"

export const serviceGenerateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  })

  return { accessToken, refreshToken }
}

export const serviceSaveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId })

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }

  const token = await Token.insertMany([{ user: userId, refreshToken }])
  console.log("USERID",userId)
  return token
}

export const serviceRemoveToken = async (refreshToken) => {
  const result = await Token.deleteOne({ refreshToken })
  return result
}

export const serviceValidateAccessToken = (token) => {
  // is there way to avoid try..catch ??
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

export const serviceValidateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

export const serviceFindToken = async (refreshToken) => {
  const result = await Token.findOne({ refreshToken })
  return result
}

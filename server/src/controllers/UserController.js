import {
  serviceSignIn,
  serviceCheckUser,
  serviceSignUp,
  serviceSignOut,
  serviceRefresh,
  serviceGetUserById,
} from '../services/userService.js'

export const checkUser = async (req, res, next) => {
  const isExist = await serviceCheckUser(req.body.email)
  res.json({ isExist })
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body
  const userData = await serviceSignIn(email, password)

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // sameSite: "none",
    // secure: false,
  })
  res.json(userData)
}

export const signUp = async (req, res, next) => {
  const { email, name, surname, password } = req.body
  const userData = await serviceSignUp(email, name, surname, password)

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
  res.json(userData)
}

export const signOut = async (req, res, next) => {
  const { refreshToken } = req.cookies
  const result = await serviceSignOut(refreshToken)

  res.clearCookie('refreshToken')
  res.json(result)
}

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies
  const userData = await serviceRefresh(refreshToken)

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
  return res.json(userData)
}

export const getUserById = async (req, res, next) => {
  const { userId } = req.body
  const userData = await serviceGetUserById(userId)
  const { email, name, surname } = userData
  return res.json({ email, name, surname })
}

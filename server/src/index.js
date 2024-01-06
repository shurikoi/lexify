import express from "express"
import User from "./model/User.js"
import connection from "./connection.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

app.post("/check-user", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const isExist = !!user

  //   if (!user) return res.status(404).json({ error: "User not found" })
  res.json({ isExist })
  console.log(user)
})

app.post("/check-password", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
  const isValid = !!user

  res.json(isValid)
  console.log(user)
})

connection().then(() => {
  app.listen(PORT)
})

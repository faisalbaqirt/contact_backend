const express = require("express")
const app = express()
const passport = require("./lib/passport")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

const AuthRoute = require("./routes/authRoute")
app.use("/api/v1/auth", AuthRoute)

const ContactRoute = require("./routes/contactRoute")
app.use("/api/v1/contact", ContactRoute)

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})


import express from "express"
import routes from "./routes/tasks.js"

import { fileURLToPath } from "url"
import path from "path"

//No ES Modules (quando você usa import), o JavaScript não sabe automaticamente em qual pasta o arquivo está. Essas linhas ensinam ele a descobrir isso, para então encontrar a pasta public corretamente.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

app.use(express.json()) //permite que sua API entenda JSON enviado no body das requisições


app.use(express.static(path.join(__dirname, "./public")))

app.use(routes)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})


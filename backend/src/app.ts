import express from 'express'
import cors from 'cors'
import reconRoute from './routes/reconRoute'
const app = express()

app.use(cors({
     origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use('/api/recon', reconRoute)

export default app
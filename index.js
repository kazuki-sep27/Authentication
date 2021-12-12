const express = import('express')
const app = express()

app.get('/', (res, req) => {
	res.send({ hi: 'there' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)

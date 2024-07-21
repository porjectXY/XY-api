const database = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  name: process.env.DB_NAME,
  password: process.env.DB_PASSWORD

}

const token = {
  secret: process.env.TOKEN_SECRET
}

export { database, token }

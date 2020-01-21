const apiId = '9bg7njyhk9'

//export const apiEndpoint = `http://localhost:3005`

//Stage is either "dev" or "prod"
export const stage = 'prod'

export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/${stage}`

export const authConfig = {
  domain: 'dev-rs5nalxx.auth0.com',
  clientId: 'FzUNMm5CZ3rqAwFoncs6FePJvkRMLbk0',
  callbackUrl: `http://localhost:3000/callback`
}

export const localauthconfig: any = {
    "access_token": process.env.ACCESS_TOKEN,
    "id_token": process.env.ID_TOKEN,  
    "expires_at": process.env.EXPIRES_AT
}

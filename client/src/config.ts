const apiId = '-------'

//export const apiEndpoint = `http://localhost:3005`

//Stage is either "dev" or "prod"
export const stage = 'prod'

export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/${stage}`

export const authConfig = {
  domain: '-------',
  clientId: '-------',
  callbackUrl: `http://localhost:3000/callback`
}

export const localauthconfig: any = {
    "access_token": process.env.ACCESS_TOKEN,
    "id_token": process.env.ID_TOKEN,  
    "expires_at": process.env.EXPIRES_AT
}

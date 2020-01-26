//Stage is either "dev" or "prod" **Case Sensitive**
export const stage = 'dev'

//------------------------------THIS PART IS FOR PRODUCTION---------------------------------

//const apiId = '9bg7njyhk9'
//export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/${stage}`
export const authConfig = {
  domain: 'dev-rs5nalxx.auth0.com',
  clientId: 'FzUNMm5CZ3rqAwFoncs6FePJvkRMLbk0',
  callbackUrl: `http://localhost:3000/callback`
}

//------------------------------THIS PART IS FOR PRODUCTION---------------------------------


//------------------------------THIS PART IS FOR LOCAL OFFLINE------------------------------

export const apiEndpoint = `http://localhost:3005`

//------------------------------THIS PART IS FOR LOCAL OFFLINE------------------------------

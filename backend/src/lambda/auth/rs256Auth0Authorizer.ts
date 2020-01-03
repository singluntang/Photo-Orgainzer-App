
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'


const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJeDILzE/4wcrKMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1yczVuYWx4eC5hdXRoMC5jb20wHhcNMTkxMjA5MDI1NDUzWhcNMzMw
ODE3MDI1NDUzWjAhMR8wHQYDVQQDExZkZXYtcnM1bmFseHguYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs3USl/wBkpjJTE8lP2PDI4zs
JEX8hUm0xUW/WaU1e0XbZVNfstQo7JxaEXJBrCuNcv1o7AbO0Ylfa8JcupZTPp8Q
c6DiJt4OZur7ENKpQs6hsb6wlF3t/0QWdodQmbHS4MwL1wSFnqFWFe2Xp8ja+t+F
wLltKswhafS/qbaTHO7HWdE5LBDeBaowpa5wtbqtkca7590xOxyV4dGXDSoUzyEY
kYIr1pt/mzc7Tr68DspY9BSNeguWseepw3kNxwYPnqkCGOQCFvX1+sKlQOiI/aSp
EnmX+r0cE7lHyScvFx4zROwPJFSRaTAhp29foIQ0tt4QGPHiqqmvcVrqL8+rMwID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRun632VkgBP3LSSez5
7GNAudef3zAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAHsOcg3w
tMuqCszs4IRwCh/B/WiRetbSivYyXz6gwnEFx1fPtVb6U5RYcgHzUIApUbp2zQhP
1JefX3aytqBik6xhFrNvK9s9u70nCxrgbHp9z9PbhY3/EStw9iY7SuZSAyf5+6gB
IeVJqsuHu06+W1wiIotbGHmmZAWjI7Sad7RTeCARXt3lgpc8lZv8jrNcXuTM8tHG
GasWjUcX2d9adG5lPxeVpETZni6E34svE2GjXgkCmI+pZz5Pvq43E1ofzAOSPp1Q
X/4fQ/WTR+CT7vEg+wPUrC8/ps44K1TWF5naMkk2ENdNt9XfzhiftmcWwQsl6pUA
v2CycNN53PiKBik=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}

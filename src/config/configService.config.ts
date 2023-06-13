export default () => ({
  web3: {
    mnemonic: process.env.ETHERS_MNEMONICS,
    provider: process.env.WEB3_PROVIDER,
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
  },
  contracts: {
    registrationContract: process.env.REGISTRATION_CONTRACT,
    couponContract: process.env.COUPON_CONTRACT,
    credentialingContract: process.env.CREDENTIALING_CONTRACT,
  },
  swaggerApi: {
    register: process.env.REGISTER_API,
    coupon: process.env.COUPON_API,
    credential: process.env.CREDENTIAL_API,
  },
  frontendUrl: process.env.FRONTEND_URL,
  ipfsServer: process.env.IPFC_SERVER,
  // nodeEnv: process.env.NODE_ENV,
  fireflyHost: process.env.FIREFLY_HOST,
  ipfsFileServer: process.env.IPFC_FILE_URL,
  });
  
//   export default () => ({
//     db: {
//       host: "localhost",
//       port: 3306,
//       username: process.env.DB_USERNAME || "root",
//       password: process.env.DB_PASSWORD || "password",
//       name: process.env.DB_NAME || "digital_credentialing",
//     },
//     email: process.env.EMAIL,
//     emailPassword: process.env.EMAIL_PASSWORD,
//     otpExpiryMinutes: parseInt(process.env.OTP_EXPIRY) || 10,
//     adminCredentials: {
//       email: process.env.ADMIN_EMAIL,
//       password: process.env.ADMIN_PASSWORD,
//       firstname: process.env.ADMIN_FIRSTNAME,
//       lastname: process.env.ADMIN_LASTNAME,
//       role: process.env.ADMIN_ROLE,
//     },
//     saltRound: parseInt(process.env.SALT_ROUND) || 10,
//     twilio: {
//       accountSid: process.env.TWILIO_ACCOUNTSID,
//       authToken: process.env.TWILIO_AUTHTOKEN,
//       verifySId: process.env.TWILIO_VERIFYSID,
//     },
//     jwt: {
//       secret: process.env.JWT_SECRET,
//       expiresIn: process.env.JWT_EXPIRES_IN || '1h',
//       setPasswordExpiryTime: process.env.JWT_USER_CREATE_EMAIL_EXPIRY_TIME || '10m'
//     },
//     frontendUrl: process.env.FRONTEND_URL,
//     ipfsServer: process.env.IPFC_SERVER,
//     nodeEnv: process.env.NODE_ENV,
//     fireflyHost: process.env.FIREFLY_HOST,
//   });
  
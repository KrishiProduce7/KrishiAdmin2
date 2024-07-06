// src/aws-exports.js

// export interface CognitoUserPoolConfig {
//   userPoolClientId: string;
//   userPoolId: string;
//   userPoolEndpoint?: string;
//   signUpVerificationMethod?: 'code' | 'link';
//   loginWith?: {
//       oauth?: OAuthConfig;
//       username?: boolean;
//       email?: boolean;
//       phone?: boolean;
//   };
//   userAttributes?: AuthConfigUserAttributes;
//   mfa?: {
//       status?: CognitoUserPoolConfigMfaStatus;
//       totpEnabled?: boolean;
//       smsEnabled?: boolean;
//   };
//   passwordFormat?: {
//       minLength?: number;
//       requireLowercase?: boolean;
//       requireUppercase?: boolean;
//       requireNumbers?: boolean;
//       requireSpecialCharacters?: boolean;
//   };
// }

const USERPOOL_CLIENT_ID : any = '5nvbju3q1r7kncs0unklbda92t';

// const awsconfig = {
//   Auth: {
//     Cognito: {
//       userPoolId: 'us-east-2_IrMWwzXSQ',
//       userPoolClientId: '5nvbju3q1r7kncs0unklbda92t',  
//     }
//   }
// };

export { USERPOOL_CLIENT_ID };

import * as WebAuthnServer from 'webauthx/server';

export const rp = {
  id: 'arkhe-node.local',
  name: 'Arkhe(N) Node',
};

export const origin = 'http://localhost:3000';

export interface User {
  id: string;
  name: string;
  displayName: string;
}

export interface StoredCredential {
  id: string;
  publicKey: string;
  userId: string;
  createdAt: number;
}

// Mock database for prototype
export const db = {
  users: new Map<string, User>(),
  credentials: new Map<string, StoredCredential>(),
};

// --- Registration Logic ---

export function getRegistrationOptions(name: string) {
  const { challenge, options } = WebAuthnServer.Registration.getOptions({
    name,
    rp,
    userVerification: 'required',
  });
  return { challenge, options };
}

export function verifyRegistration(credential: any, challenge: string) {
  const result = WebAuthnServer.Registration.verify(credential, {
    challenge,
    origin,
    rpId: rp.id,
  });

  return result.credential;
}

// --- Authentication Logic ---

export function getAuthenticationOptions(credentialId: string) {
  const { challenge, options } = WebAuthnServer.Authentication.getOptions({
    credentialId,
    rpId: rp.id,
    userVerification: 'required',
  });
  return { challenge, options };
}

export function verifyAuthentication(response: any, challenge: string, publicKey: string) {
  const valid = WebAuthnServer.Authentication.verify(response, {
    challenge,
    publicKey,
    origin,
    rpId: rp.id,
  });
  return valid;
}

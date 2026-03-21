
import * as WebAuthnServer from 'webauthx/server';

describe('WebAuthn Logic', () => {
  test('Registration options generation', () => {
    const { challenge, options } = WebAuthnServer.Registration.getOptions({
      name: 'alice',
      rp: { id: 'example.com', name: 'Example' },
    });
    expect(challenge).toBeDefined();
    expect(options.publicKey.user.name).toBe('alice');
  });

  test('Authentication options generation', () => {
    const { challenge, options } = WebAuthnServer.Authentication.getOptions({
      credentialId: 'test-id',
      rpId: 'example.com',
    });
    expect(challenge).toBeDefined();
    expect(options.publicKey.allowCredentials?.[0].id).toBeDefined();
  });
});

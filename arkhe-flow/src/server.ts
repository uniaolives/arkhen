
import Fastify from 'fastify';
import Redis from 'ioredis';
import { Queue, Worker } from 'bullmq';
import cookie from '@fastify/cookie';
import {
  getRegistrationOptions,
  verifyRegistration,
  getAuthenticationOptions,
  verifyAuthentication,
  db
} from './auth/webauthn.js';

const server = Fastify({ logger: true });

// Register cookies for challenge/session storage
server.register(cookie, {
  secret: 'arkhe-secret-ontological-key', // In prod, use process.env.COOKIE_SECRET
  parseOptions: {}
});

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const executionQueue = new Queue('executions', { connection });

// --- WebAuthn Endpoints ---

// Registration
server.post('/register/options', async (request, reply) => {
  const { name } = request.body as { name: string };
  const { challenge, options } = getRegistrationOptions(name);

  reply.setCookie('challenge', challenge, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300, // 5 minutes
    path: '/',
  });

  return { options };
});

server.post('/register/verify', async (request, reply) => {
  const { credential } = request.body as { credential: any };
  const challenge = request.cookies.challenge;

  if (!challenge) {
    return reply.status(400).send('Missing challenge');
  }

  // Consume challenge
  reply.clearCookie('challenge');

  const verifiedCredential = verifyRegistration(credential, challenge);

  // Store user and credential
  const userId = `user_${Date.now()}`;
  db.users.set(userId, { id: userId, name: 'Alice', displayName: 'Alice' });
  db.credentials.set(verifiedCredential.id, {
    ...verifiedCredential,
    userId,
    createdAt: Date.now(),
  });

  return { success: true };
});

// Authentication
server.post('/auth/options', async (request, reply) => {
  const { credentialId } = request.body as { credentialId: string };
  const { challenge, options } = getAuthenticationOptions(credentialId);

  reply.setCookie('challenge', challenge, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
  });

  return { options };
});

server.post('/auth/verify', async (request, reply) => {
  const { response } = request.body as { response: any };
  const challenge = request.cookies.challenge;
  const storedCredential = db.credentials.get(response.id);

  if (!challenge || !storedCredential) {
    return reply.status(400).send('Invalid request or credential');
  }

  reply.clearCookie('challenge');

  const valid = verifyAuthentication(response, challenge, storedCredential.publicKey);

  if (valid) {
    // Mint session
    const sessionId = `sess_${Date.now()}`;
    reply.setCookie('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { success: true };
  } else {
    return reply.status(401).send('Authentication failed');
  }
});

// --- Workflow Endpoints ---

const WorkflowService = {
  getAll: async () => [{ id: 'wf_123', name: 'Ontological Sync' }],
  getExecution: async (id: string) => ({ id, status: 'success', proof: '0x777...pi2' }),
  load: async (id: string) => ({ id, name: 'Flow' })
};

server.get('/workflows', async (request, reply) => {
  return await WorkflowService.getAll();
});

server.post('/workflows/:id/execute', async (request, reply) => {
  const { id } = request.params as { id: string };
  const { data } = (request.body as { data?: any }) || {};

  const job = await executionQueue.add('execute', {
    workflowId: id,
    inputData: data,
  }, {
    jobId: `exec_${Date.now()}`,
  });

  return { executionId: job.id };
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Arkhe Flow Server listening at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

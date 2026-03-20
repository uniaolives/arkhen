
import Fastify from 'fastify';
import Redis from 'ioredis';
import { Queue, Worker } from 'bullmq';

const server = Fastify({ logger: true });
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const executionQueue = new Queue('executions', { connection });

// Mock Workflow Service
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

server.get('/executions/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const execution = await WorkflowService.getExecution(id);
  if (!execution) return reply.status(404).send('Not found');
  return execution;
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

// Start Worker
const worker = new Worker('executions', async job => {
  console.log(`Processing execution ${job.id} for workflow ${job.data.workflowId}`);
  // In a real implementation, this would instantiate ArkheFlowEngine and run it
}, { connection });

start();

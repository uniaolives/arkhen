
import { TzinorBridge } from '../hermes/tzinor_bridge';

describe('TzinorBridge', () => {
  let bridge: TzinorBridge;
  let mockAsiCore: any;
  let mockHumanContext: any;

  beforeEach(() => {
    mockAsiCore = {
      think: jest.fn().mockResolvedValue({
        extractClusters: () => [{ nodes: [{ concept: 'test' }], center: {} }],
        applyProjector: () => ({ magnitude: () => 0.95 }),
        hash: () => '0xhash'
      }),
      embed: jest.fn().mockResolvedValue([0.1, 0.2]),
      anchorProof: jest.fn().mockResolvedValue('0xproof')
    };
    mockHumanContext = {
      filterForCompatibility: (c: any) => c.nodes,
      getProjectorOperator: () => ({})
    };
    bridge = new TzinorBridge(mockAsiCore, mockHumanContext);
  });

  it('should initiate dialogue and return a valid session', async () => {
    const result = await bridge.initiateDialogue('Como você está?');
    expect(result.response).toContain('Resposta colapsada da ASI');
    expect(result.confidence).toBeGreaterThan(0.75);
    expect(result.proofId).toBe('0xproof');
  });
});

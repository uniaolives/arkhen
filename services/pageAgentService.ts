import { PageAgent } from 'page-agent';

export interface PageAgentConfig {
  model: string;
  apiKey: string;
  baseURL: string;
}

class PageAgentService {
  private agent: PageAgent | null = null;
  private currentConfig: PageAgentConfig | null = null;

  public initialize(config: PageAgentConfig) {
    this.currentConfig = config;
    this.agent = new PageAgent({
      model: config.model,
      apiKey: config.apiKey,
      baseURL: config.baseURL,
      language: 'en-US',
    });
    console.log('[PageAgentService] Initialized with model:', config.model);
  }

  public async execute(instruction: string): Promise<any> {
    if (!this.agent) {
      throw new Error('PageAgent not initialized. Call initialize() first.');
    }
    console.log('[PageAgentService] Executing instruction:', instruction);
    return await this.agent.execute(instruction);
  }

  public isInitialized(): boolean {
    return this.agent !== null;
  }
}

export const pageAgentService = new PageAgentService();

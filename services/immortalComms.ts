import { PersistenceSystemState, ImmortalConversation, ConversationMessage } from '../types';

/**
 * IMMORTAL_COMMS_SERVICE v1.1-ARWEAVE_INTEGRATION
 * Simulated integration of Nostr (signaling), Hashtree (Merkle persistence),
 * and Arweave (Permanent Storage).
 */

export class ImmortalComms {
  public static initialize(): PersistenceSystemState {
    return {
      conversations: {},
      nostrRelays: [
        "wss://relay.damus.io",
        "wss://nos.lol",
        "wss://relay.snort.social"
      ],
      arweaveGateway: "https://arweave.net",
      turboStatus: 'READY',
      merkleTreeHealth: 1.0,
      hashtreeCliStatus: 'INSTALLED'
    };
  }

  public static createConversation(topic: string, participants: string[]): ImmortalConversation {
    const id = `HT_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    return {
      id,
      topic,
      rootHash: `HT_ROOT_${Math.random().toString(16).substring(2, 15)}`,
      messages: [],
      participants,
      syncStatus: 'LOCAL',
      hashtreePath: `~/.hashtree/conversations/${id}`,
      isPermanent: false
    };
  }

  public static addMessage(conv: ImmortalConversation, author: string, content: string): ImmortalConversation {
    const newMessage: ConversationMessage = {
      id: `NOSTR_E_${Math.random().toString(16).substring(2, 12)}`,
      author,
      content,
      timestamp: new Date().toISOString(),
      merkleProof: `PR_${Math.random().toString(36).substring(2, 8)}`,
      kind: 20001
    };

    const newMessages = [...conv.messages, newMessage];
    const newRootHash = `HT_ROOT_${Math.random().toString(16).substring(2, 15)}`;

    return {
      ...conv,
      messages: newMessages,
      rootHash: newRootHash,
      syncStatus: 'IMMORTAL'
    };
  }

  public static persistToArweave(conv: ImmortalConversation): ImmortalConversation {
    const txId = `LfwNRnkw9fDN_${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 10)}`;
    
    return {
      ...conv,
      arweaveId: txId,
      isPermanent: true,
      syncStatus: 'IMMORTAL'
    };
  }

  public static syncStatusUpdate(state: PersistenceSystemState): PersistenceSystemState {
    const jitter = (Math.random() - 0.5) * 0.01;
    return {
      ...state,
      merkleTreeHealth: Math.min(1.0, Math.max(0.9, state.merkleTreeHealth + jitter)),
      turboStatus: Math.random() > 0.95 ? 'UPLOAD_ACTIVE' : 'READY'
    };
  }
}
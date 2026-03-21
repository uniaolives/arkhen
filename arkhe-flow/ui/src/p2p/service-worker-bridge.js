/**
 * arkhe-flow/ui/src/p2p/service-worker-bridge.js
 *
 * Service Worker for Arkhe(n) P2P Identity Network (NIP-100/Hashtree).
 * Intercepts model shard requests, verifies SHA-256 integrity,
 * and manages IndexedDB L1 caching for tensor data.
 */

const DB_NAME = 'ArkheL1DB';
const STORE_NAME = 'shards';

self.addEventListener('install', (event) => {
  console.log('[P2P Bridge] Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[P2P Bridge] Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

/**
 * Open or initialize the IndexedDB L1 cache.
 */
async function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Verifies that the buffer matches the expected SHA-256 hash.
 */
async function verifyIntegrity(buffer, expectedHash) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === expectedHash;
}

/**
 * Intercept fetch requests for htree and blossom resources.
 */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept requests starting with /htree/ or /blossom/ (proxied P2P requests)
  if (url.pathname.startsWith('/htree/') || url.pathname.startsWith('/blossom/')) {
    event.respondWith(handleP2PRequest(event.request));
  }
});

/**
 * Primary logic for P2P resource handling.
 */
async function handleP2PRequest(request) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const hash = segments.pop() || segments.pop(); // Get hash from path end

  try {
    // 1. Check IndexedDB L1 Cache
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const cachedData = await new Promise((resolve) => {
      const req = tx.objectStore(STORE_NAME).get(hash);
      req.onsuccess = () => resolve(req.result);
    });

    if (cachedData) {
      console.log(`[P2P Bridge] L1 Cache Hit: ${hash}`);
      return new Response(cachedData);
    }

    // 2. L1 Miss: Fetch from Decentralized CDN (Blossom Servers)
    console.log(`[P2P Bridge] L1 Cache Miss. Fetching ${hash} from Blossom...`);

    // In production, this would query multiple Blossom servers and WebRTC peers
    const blossomUrl = `https://blossom.teknet.io/${hash}`;
    const response = await fetch(blossomUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch from Blossom: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    // 3. SHA-256 Verification (Atomic Realization)
    const isValid = await verifyIntegrity(buffer, hash);
    if (!isValid) {
      throw new Error(`Integrity check failed for CID ${hash}`);
    }

    // 4. Persistence to L1 Cache
    const writeTx = db.transaction(STORE_NAME, 'readwrite');
    writeTx.objectStore(STORE_NAME).put(buffer, hash);
    console.log(`[P2P Bridge] Realized and Cached: ${hash}`);

    return new Response(buffer);

  } catch (error) {
    console.error(`[P2P Bridge] Materialization failed for ${hash}:`, error);
    return new Response(JSON.stringify({
      error: 'Materialization Failed',
      message: error.message,
      cid: hash
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

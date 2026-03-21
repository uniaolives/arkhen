# tzinor/deploy/hashtree/nostr_client.py
import json
import asyncio
import time
import hashlib
from typing import Dict, List, Optional, Callable

class NostrSignalingClient:
    """
    NIP-100/NIP-44 Signaling Client over Nostr Relays.
    Exchanges WebRTC offers/answers as ephemeral events (kind 25050).
    """
    def __init__(self, npub: str, relay_urls: List[str]):
        self.npub = npub
        self.relays = relay_urls
        self.connected_peers = {}
        self.message_handlers = []
        self.is_running = False

    async def connect(self):
        """Mock connection to Nostr relays."""
        self.is_running = True
        print(f"Connected to Nostr relays: {self.relays}")
        print(f"My public identity: {self.npub}")

    async def send_event(self, target_npub: str, kind: int, content: Dict):
        """Sends an ephemeral signaling event to a target peer."""
        event = {
            "kind": kind,
            "pubkey": self.npub,
            "content": json.dumps(content),
            "created_at": int(time.time()),
            "tags": [["p", target_npub]]
        }
        # In actual deployment, this sends to WSS relays
        print(f"Sent event {kind} to {target_npub}: {content.get('type', 'data')}")

    async def broadcast_presence(self):
        """NIP-100 Hello: Broadcast presence to discovery peers."""
        while self.is_running:
            await self.send_event("", 25050, {"type": "hello", "status": "listening"})
            await asyncio.sleep(60)

    def on_message(self, handler: Callable):
        self.message_handlers.append(handler)

    async def simulate_incoming_offer(self, source_npub: str, offer: Dict):
        """Simulates receiving a WebRTC offer from Nostr."""
        for handler in self.message_handlers:
            await handler(source_npub, offer)

class WebRTCSignaler:
    """
    Handles WebRTC signaling handshake over Nostr.
    """
    def __init__(self, nostr_client: NostrSignalingClient):
        self.nostr = nostr_client
        self.nostr.on_message(self._handle_signal)

    async def _handle_signal(self, sender: str, signal: Dict):
        if signal.get("type") == "offer":
            await self.on_offer(sender, signal["sdp"])
        elif signal.get("type") == "answer":
            await self.on_answer(sender, signal["sdp"])
        elif signal.get("type") == "ice":
            await self.on_ice(sender, signal["candidate"])

    async def send_offer(self, target: str, sdp: str):
        await self.nostr.send_event(target, 25050, {"type": "offer", "sdp": sdp})

    async def send_answer(self, target: str, sdp: str):
        await self.nostr.send_event(target, 25050, {"type": "answer", "sdp": sdp})

    # Callbacks to be implemented by P2PBridge
    async def on_offer(self, sender: str, sdp: str): pass
    async def on_answer(self, sender: str, sdp: str): pass
    async def on_ice(self, sender: str, candidate: str): pass

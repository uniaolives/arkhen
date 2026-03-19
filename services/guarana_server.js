const WebSocket = require('ws');

/**
 * Protocolo Guaraná-Tzinor
 * Comunicação entre a TV e dispositivos secundários.
 */
class GuaranaServer {
    constructor(port = 8765) {
        this.wss = new WebSocket.Server({ port });
        this.devices = new Map();
        this.init();
    }

    init() {
        this.wss.on('connection', (ws, req) => {
            const deviceId = req.url.split('/').pop() || 'unknown';
            this.devices.set(deviceId, ws);
            console.log(`📡 Device connected via Tzinor: ${deviceId}`);

            ws.on('message', (message) => {
                console.log(`📥 Received from ${deviceId}: ${message}`);
            });

            ws.on('close', () => {
                this.devices.delete(deviceId);
                console.log(`🔌 Device disconnected: ${deviceId}`);
            });
        });
    }

    sendToDevice(deviceId, message) {
        const ws = this.devices.get(deviceId);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
            return true;
        }
        return false;
    }
}

if (require.main === module) {
    new GuaranaServer();
    console.log("🌐 Guaraná-Tzinor WebSocket Server running on port 8765");
}

module.exports = GuaranaServer;

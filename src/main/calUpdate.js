function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class CalUpdateNotifier {
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:4000/ws`);

        
        this.socket.onopen = (event) => {
            this.receiveEvent({ msg: 'connected' });
        };
        
        this.socket.onclose = (event) => {
            this.receiveEvent({ msg: 'disconnected' });
        };
        
        this.socket.onmessage = async (msg) => {
            console.log("message received");
            try {
                let text;
                if (typeof msg.data === 'string') {
                    // If the data is already a string, use it directly
                    text = msg.data;
                } else if (msg.data instanceof ArrayBuffer) {
                    // If the data is an ArrayBuffer, decode it
                    text = new TextDecoder('utf-8').decode(msg.data);
                } else if (msg.data instanceof Blob) {
                    // If the data is a Blob, convert it to ArrayBuffer first
                    const arrayBuffer = await msg.data.arrayBuffer();
                    text = new TextDecoder('utf-8').decode(arrayBuffer);
                } else {
                    throw new Error("Unsupported message type");
                }
        
                const event = JSON.parse(text);
                this.receiveEvent(event);
            } catch (error) {
                console.error("Failed to process incoming message:", error);
            }
        };
    }

    async broadcastEvent() {
        console.log("brodcastEvent()");
        const event = { msg: "update" };
        this.socket.send(JSON.stringify(event));
    }

    receiveEvent(event) {
        console.log("recieveEvent: ", event);
        
        this.handlers.forEach((handler) => {
            handler();
          });
    }

    addHandle(exthandle)
    {
        this.handlers.push(exthandle);
    }
}

const notifier = new CalUpdateNotifier();
export { notifier };

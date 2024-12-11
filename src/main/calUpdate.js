class CalUpdateNotifier {
    events = [];
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
            try {
            const text = typeof msg.data === 'string' ? msg.data : new TextDecoder('utf-8').decode(msg.data);
            const event = JSON.parse(text);
            this.receiveEvent(event);
            console.log("message recieved");
            } catch {}
        };
    }

    broadcastEvent() {
        const event = { msg: "update" };
        this.socket.send(JSON.stringify(event));
    }

    receiveEvent(event) {
        console.log("recieveEvent: ", event);
    }
}

const notifier = new CalUpdateNotifier();
export { notifier };

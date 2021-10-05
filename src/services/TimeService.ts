type TimeChangedHandler = (newTime: Date) => void;

interface ITimeServiceEventHandlers {
    Second: TimeChangedHandler[];
    Minute: TimeChangedHandler[];
    Hour: TimeChangedHandler[];
}

class TimeService {
    private _handlers: ITimeServiceEventHandlers = {
        Second: [],
        Minute: [],
        Hour: []
    };

    constructor() {
        const initialWait = 1000 - new Date().getMilliseconds();
        setTimeout(() => {
            setInterval(() => {
                const now = new Date();
                this.notify('Second', now);
                if (now.getSeconds() === 0) {
                    this.notify('Minute', now);
                    if (now.getMinutes() === 0) {
                        this.notify('Hour', now);
                    }
                }
            }, 1000);
        }, initialWait);
    }

    public subscribe = (event: keyof ITimeServiceEventHandlers, delegate: TimeChangedHandler) => {
        if (delegate) {
            const existingIndex = this._handlers[event].indexOf(delegate);
            if (existingIndex >= 0) {
                return existingIndex + 1;
            }
            else {
                this._handlers[event].push(delegate);
                return this._handlers[event].length;
            }
        }
    }

    public unsubscribe = (event: keyof ITimeServiceEventHandlers, id: number) => {
        if (id >= 0 && id < this._handlers[event].length) {
            this._handlers[event].splice(id, 1);
        }
    }

    private notify = (event: keyof ITimeServiceEventHandlers, newTime: Date) => {
        this._handlers[event].forEach(delegate => {
            delegate(newTime);
        })
    }
}

const timeService = new TimeService();
export default timeService;
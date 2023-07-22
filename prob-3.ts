enum AppEvent {
    Create,
    Read,
    Change,
    Delete,
}

class Listener {

    q: string[];

    constructor(backlog: string[]) {
        this.q = [...backlog];
    }

    receive(message: string): void {
        this.q.push(message);
    }

    process(): string | undefined {
        if (this.q.length === 0) {
            throw new Error("Nothing left to process!");
        }
        return this.q.shift();
    }

}

class EventEmitter {

    validEvents: AppEvent[];
    eventListeners: Map<AppEvent, Listener[]>;

    constructor(validEvents: AppEvent[]) {
        this.validEvents = [...validEvents];
        this.eventListeners = new Map();
        for (let e of validEvents) {
            this.eventListeners.set(e, []);
        }
    }

    on(eventName: AppEvent, listener: Listener): void {
        if (!(eventName in this.validEvents)) {
            throw new Error("Not a valid event!");
        }
        this.eventListeners[eventName].push(listener);
    }

    off(eventName: AppEvent, listener: Listener): void {
        if (!(eventName in this.validEvents)) {
            throw new Error("Not a valid event!");
        }

        let registeredListeners = this.eventListeners.get(eventName);

        if (!(listener in registeredListeners)) {
            throw new Error(
                `Listener ${listener} not registered for eventName ${eventName}`
            );
        }
    }

}

enum AppEvent {
    Create,
    Read,
    Change,
    Delete,
}

class Listener {

    q: string[];
    name: string;

    constructor(name: string, backlog: string[]) {
        this.name = name;
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
    }

    private allowValidEventsOnly(evnt: AppEvent): void {
        if (!this.validEvents.includes(evnt)) {
            throw new Error("Not a valid event!");
        }
    }

    on(evnt: AppEvent, listener: Listener): void {
        this.allowValidEventsOnly(evnt)

        if (!this.eventListeners.get(evnt)) {
            this.eventListeners.set(evnt, [])
        }
        const registeredListeners = this.eventListeners.get(evnt);

        if (registeredListeners?.some(l => l.name === listener.name)) {
            throw new Error(
                `Listener ${listener.name} already registered for` +
                    ` event ${evnt}!`
            )
        } else {
            registeredListeners?.push(listener);
        }

    }

    off(evnt: AppEvent, listener: Listener): void {
        this.allowValidEventsOnly(evnt)

        const registeredListeners = this.eventListeners.get(evnt);

        if (!registeredListeners) {
            throw new Error(
                `No listeners registered for event ${evnt}!`
            );
        }

        const i = registeredListeners.findIndex(l => l.name === listener.name);
        if (i === -1) {
            throw new Error(
                `Listener ${listener.name} not registered for ` +
                    `event ${evnt} but asked to be switched off!`
            );
        } else {
            registeredListeners.splice(i, 1);
        }

    }

}


let l1 = new Listener('l1', []);
let l2 = new Listener('l2', []);
let l3 = new Listener('l3', []);

let em = new EventEmitter([AppEvent.Create, AppEvent.Read]);

em.on(AppEvent.Create, l1);
em.on(AppEvent.Create, l2);
em.on(AppEvent.Read, l3);

console.log(em.eventListeners);

em.off(AppEvent.Create, l1);

console.log(em.eventListeners);

// Should throw error as l1 is not registered for AppEvent.Create
try {
    em.off(AppEvent.Create, l1);
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

// Should throw error as AppEvent.Change is not a valid event
try {
    em.on(AppEvent.Change, l1);
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

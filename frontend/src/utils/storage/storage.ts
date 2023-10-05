import type { StoreJsAPI } from "./types";

export class Storage {
    name: string;
    private store: StoreJsAPI;

    constructor(name: string, store: StoreJsAPI) {
        this.name = name;
        this.store = store;
    }

    get() {
        return this.store.get(this.name);
    }

    set(value: any) {
        this.store.set(this.name, value);
    }

    remove() {
        this.store.remove(this.name);
    }
}

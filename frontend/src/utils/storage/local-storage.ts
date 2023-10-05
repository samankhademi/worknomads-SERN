import engine from "store/src/store-engine";
import localStorage from "store/storages/localStorage";
import { Storage } from "./storage";

export class LocalStorage extends Storage {
    constructor(name: string) {
        const store = engine.createStore([localStorage]);
        super(name, store);
    }
}

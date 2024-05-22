import { Membership, Person } from 'framework/dist/output.js';
import MicroEvent from 'microevent';

class PersonModel extends MicroEvent implements Person {
    name: string;
    age: number;
    membership: Membership = { plan: 0, expiration: 'N/A'}

    constructor(name: string, age: number) {
        super();
        this.name = name;
        this.age = age;
    }

    setName(name: string): void {
        this.name = name;
        this.trigger('change:name', this.name);
    }
}

export default PersonModel;
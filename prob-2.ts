type Contact = {
    name: string;
    phone: string;
    email: string;
}

let contacts: Contact[] = [
    {
        name: "John Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com",
    }
];

const newContact: Contact = {
    name: "Jane Doe",
    phone: "098-765-4321",
    email: "jane.doe@example.com",
};

function addContact (contacts: Contact[], newContact: Contact) {
    for (let c of contacts) {
        if (newContact["name"] === c["name"]) {
            throw new Error(`Contact with name ${c["name"]} already exists!`);
        }
    }
    contacts.push(newContact);
    return contacts;
}

console.log(addContact(contacts, newContact));
console.log(addContact(contacts, newContact));

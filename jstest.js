const low = require('lowdb');

const FileAsync = require('lowdb/adapters/FileAsync');


const adapter = new FileAsync('db.json');


async function main() {
    const db = await low(adapter)
    db.defaults({users : [] , passwords : []})
        .write();
    // db.get('users')
    //     .push({id : 1 , username : 'Nassim Meridja'})
    //     .write()
        


    const users =db.get('passwords')
    console.log(users)
}

main();


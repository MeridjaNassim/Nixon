'use strict';

const crypto = require('crypto');

const SECRET_KEY = 'secret'; 
const IV_LENGTH = 16; // For AES, this is always 16

/// generating a 256 bit pseudo random key
let sha256hash = crypto.createHash('sha256') // Must be 256 bits (32 characters)
sha256hash.update(SECRET_KEY,'utf8')
const KEY = sha256hash.digest()

function encrypt(text) {
 
 let iv = crypto.randomBytes(IV_LENGTH);
 let cipher = crypto.createCipheriv('aes-256-cbc',KEY, iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return iv.toString('base64') + ':' + encrypted.toString('base64');
}

function decrypt(text) {
 let textParts = text.split(':');
 let iv = Buffer.from(textParts.shift(), 'base64');
 let encryptedText = Buffer.from(textParts.join(':'), 'base64');
 let decipher = crypto.createDecipheriv('aes-256-cbc', KEY, iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

let crypt = encrypt('hello hello world');

console.log('Hello world encrypted : ' , crypt)
console.log('Hello world decrypted : ' ,decrypt(crypt))
module.exports = { decrypt, encrypt };
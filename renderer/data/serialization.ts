import crypto from 'crypto';

const generate256BitKeyFromStringUsingSha256 = (key : string) : Buffer=> {
    let sha256hash = crypto.createHash('sha256') // Must be 256 bits (32 characters)
    sha256hash.update(key,'utf8')
    return sha256hash.digest()
}


class EncryptionSerializer {
    private _default_secret = 'very secrete stuff'
    private ivLength = 16
    private _algorithm : string ;
    private _secreteKey : string ;
    private _encoding :BufferEncoding ;
    constructor(algorithm : string , key : string , encoding : BufferEncoding) {
        this._algorithm = algorithm 
        this._secreteKey = key || this._default_secret;
        this._encoding = encoding
    }
    public setSecreteKey(key : string) {
        this._secreteKey = key;
    }
    public encrypt(data : string , key : string= this._secreteKey) {
        let KEY256 = generate256BitKeyFromStringUsingSha256(key);
        let iv = crypto.randomBytes(this.ivLength);
        let cipher = crypto.createCipheriv(this._algorithm,KEY256, iv);
        let encrypted = cipher.update(data);
       
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString(this._encoding) + ':' + encrypted.toString(this._encoding);
    }
    public decrypt (data : string , key : string= this._secreteKey) :string {
        let KEY256 = generate256BitKeyFromStringUsingSha256(this._secreteKey);
        let textParts = data.split(':');
        let iv = Buffer.from(textParts.shift(), this._encoding);
        let encryptedText = Buffer.from(textParts.join(':'), this._encoding);
        let decipher = crypto.createDecipheriv(this._algorithm, KEY256, iv);
        let decrypted = decipher.update(encryptedText);
    
        decrypted = Buffer.concat([decrypted, decipher.final()]);
    
        return decrypted.toString();
    }
}

export const AESerializerBase64 = new  EncryptionSerializer('aes-256-cbc','','base64')
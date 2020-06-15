import crypto from 'crypto';
/**
 * Transform a string key into a 256 bit using SHA-256 algorithm
 * @param key the key to transform into a 256bit key using SHA-256
 */
const generate256BitKeyFromStringUsingSha256 = (key : string) : Buffer=> {
    let sha256hash = crypto.createHash('sha256') // Must be 256 bits (32 characters)
    sha256hash.update(key,'utf8')
    return sha256hash.digest()
}
/**
 * Abstract Serializer object that serializes and deserialzes data using a strategy
 * @method serialize() : serializes data using a strategy
 * @method deserialize(): deserializes a string data using a strategy
 */
export interface  Serializer {
    /**
     * 
     * @param data the data to serialize
     * @returns string representation of the object
     */
    serialize(data : any) : string,
    /**
     * 
     * @param data the string data to deserialize
     * @returns arbitrary representation of the object
     */
    deserialize(data : string) : any
}
/**
 * A Serializer that uses Encryption to transform data
 */
export class EncryptionSerializer implements Serializer{
    private _default_secret = 'very secrete stuff'
    private ivLength = 16
    private _algorithm : string ;
    private _secreteKey : string ;
    private _encoding :BufferEncoding ;
    /**
     * 
     * @param algorithm the algorithm used for encryption
     * @param key the key used to encrypt and decrypt data
     * @param encoding the encoding of the data
     */
    constructor(algorithm : string ,  encoding : BufferEncoding ,key? : string ) {
        this._algorithm = algorithm 
        this._secreteKey = key || this._default_secret;
        this._encoding = encoding
    }
    /**
     * Overwrites the current object key of encryption & decryption
     * @param key the key to overwrite the previous key with
     * @returns the serializer object
     */
    public setSecreteKey(key : string) : EncryptionSerializer {
        this._secreteKey = key;
        return this
    }
    public serialize(data : any) : string {
        return this.encrypt(JSON.stringify(data) , this._secreteKey)
    }
    public deserialize(data : string) : any {
        return JSON.parse(this.decrypt(data,this._secreteKey))
    }
    private encrypt(data : string , key : string= this._secreteKey) {
        let KEY256 = generate256BitKeyFromStringUsingSha256(key);
        let iv = crypto.randomBytes(this.ivLength);
        let cipher = crypto.createCipheriv(this._algorithm,KEY256, iv);
        let encrypted = cipher.update(data);
       
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString(this._encoding) + ':' + encrypted.toString(this._encoding);
    }
    private decrypt (data : string , key : string= this._secreteKey) :string {
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
/**
 * A Serializer that uses AES for encryption and Base64 for encoding
 */
export const AESerializerBase64 = new  EncryptionSerializer('aes-256-cbc','base64')

/**
 * A Serializer that uses plain JSON serilaization and deserialization
 */
export const serializer_json : Serializer = {
    serialize(data : any) :string {
        return JSON.stringify(data)
    },
    deserialize(data : string) : any{
        return JSON.parse(data)
    }
}
import * as CryptoJS from 'crypto-js';
function EncryptedPassword(data: any){
    const result = CryptoJS.SHA256(data).toString();
    console.log(result)
    return result
}

export default EncryptedPassword
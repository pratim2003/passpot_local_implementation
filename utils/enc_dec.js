const crypto = require("crypto")

const enc_dec = {
    encrypt : (text,secrectKey)=>{
        const key = crypto.createHash("sha256").update(secrectKey).digest()
        const iv = crypto.randomBytes(16)
        // console.log(key,iv)
        const cipher = crypto.createCipheriv("aes-256-cbc",key,iv)
        if(!text) throw new Error("text can't be empty")
        let encrypted  = cipher.update(text,"utf-8","hex")
        // console.log(encrypted)
        encrypted +=cipher.final("hex")
        return iv.toString("hex")+":"+encrypted
    },
    decrypt : (encryptedText,secrectKey)=>{
        const key = crypto.createHash("sha256").update(secrectKey).digest()
        const [ivHex,encrypted] = encryptedText.split(":")
        const iv = Buffer.from(ivHex,"hex")
        const dicipher = crypto.createDecipheriv("aes-256-cbc",key,iv)
        const decrypt = dicipher.update(encrypted,"hex","utf-8")
        decrypt += dicipher.final("utf-8")
        console.log(decrypt)
    },
    secrectKey : crypto
    .createHash("sha256")
    .update("DFRSEFGTHNJGFTHGFRIOPLMZAQWSCDERFVGGTdiusaidu")
    .digest("hex")
    .slice(0, 32)
}

module.exports = {
    enc_dec
}
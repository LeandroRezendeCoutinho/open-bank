import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

export const encrypt = async (password: string) => {
    const iv = randomBytes(16)
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer
    const cipher = createCipheriv('aes-256-ctr', key, iv)
    
    const encryptedText = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ])

    return encryptedText.toString()
}

export const decrypt = async (password: string, encryptedText: string) => {
    const iv = randomBytes(16)
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer
    const decipher = createDecipheriv('aes-256-ctr', key, iv)

    const decryptedText = Buffer.concat([
        decipher.update(Buffer.from(encryptedText, 'hex')),
        decipher.final(),
    ])

    return decryptedText.toString()
}
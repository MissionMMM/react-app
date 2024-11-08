// Promise 异步方法
// 生成密钥
export async function generateKey() {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// 导出密钥 进一步加密密钥
export async function exportKey(key) {
    return await crypto.subtle.exportKey("jwk", key);
}

// 导入密钥 将加密后的密钥解密
export async function importKey(jwk) {
    return await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
    );
}

// 加密
export async function encrypt(data, key) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );
    return { iv: Array.from(iv), ciphertext: Array.from(new Uint8Array(encryptedData)) };
}

// 解密
export async function decrypt({ iv, ciphertext }, key) {
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: new Uint8Array(iv),
        },
        key,
        new Uint8Array(ciphertext)
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
}

// 示例用法
// (async () => {
//     let a = "dsadsa1651c3xz51c3x2z1c2xz"
//     const key = await generateKey()
//     console.log('我是生成的密钥:', key)

//     let b = await encrypt(a, key)
//     console.log('我是加密后的a:', b)
//     // 导出密钥
//     const exportedKey = await exportKey(key);
//     console.log('我是导出的密钥:', exportedKey)

//     // 导入密钥
//     const importedKey = await importKey(exportedKey);
//     console.log('我是导入的密钥:', importedKey)

//     let c = await decrypt(b, importedKey)
//     console.log('我是解密后的a:', c)
// })()
const fs = require('fs');
const path = require('path');
const { Wallets } = require('fabric-network');

async function addAdminToWallet() {
    try {
        // Wallet 폴더 경로
        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Cryptogen으로 생성된 인증서와 키 경로
        const certPath = path.join(__dirname, 'organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem');
        const keyPath = path.join(__dirname, 'organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/priv_sk');

        // 인증서와 키 파일 읽기
        const cert = fs.readFileSync(certPath).toString();
        const key = fs.readFileSync(keyPath).toString();

        // Admin ID 추가
        const identity = {
            credentials: {
                certificate: cert,
                privateKey: key,
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        await wallet.put('admin', identity);
        console.log('Successfully added admin identity to the wallet');
    } catch (error) {
        console.error(`Failed to add admin identity to the wallet: ${error}`);
    }
}

addAdminToWallet();

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function connectToFabric() {
    const ccpPath = path.resolve(__dirname, 'connection.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const wallet = await Wallets.newFileSystemWallet('./wallet');
    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet,
        identity: 'admin', // Admin 인증서 사용
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('dpChaincode');
    return contract;
}

module.exports = connectToFabric;

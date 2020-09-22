const express = require('express');
const config = require('../config');
const EthereumTx = require('ethereumjs-tx').Transaction;

const router = express.Router();
const erc20Abi = config.getErc20ABI();
const network = config.getNetwork();

router.get('/', function(req, res) {
  res.render('transfer');
});

router.post('/', async function(req, res) {
  let response = {};
  
  try {
    let txParam;
    const instance = req.app.get('axiosInstance');
    const web3 = req.app.get('web3');
  
    const fromAddress = req.session.address ;
    const fromPrivateKey = req.session.privateKey; 
    const toAddress = req.body.toAddress;
    const amount = req.body.amount
    const contractAddress = req.body.contractAddress;

    if (!fromAddress || !fromPrivateKey) return res.json({ status: 'SESSION' });

    if (!toAddress) return res.json({ status: 'NOT FOUND: toAddress' });
    if (!amount) return res.json({ status: 'NOT FOUND: amount' });

    if (fromPrivateKey.startsWith('0x')) {
      fromPrivateKey = fromPrivateKey.replace('0x', '');
    }

    // 주소의 넌스값 가져오기
    //http://octet-fullhistory-test.hexlant.com:3000/v1/addresses/:address/nonce
    const { data: { nonce } } = await instance.get(`addresses/${fromAddress}/nonce`)
    //
    // 
    
    const value = web3.utils.toWei(amount.toString(), 'ether');
    
    if(contractAddress) {
      const token = new web3.eth.Contract(erc20Abi, contractAddress);
      const inputData = token.methods.transfer(toAddress, value).encodeABI();
      txParam = { //원시트랜잭션 생성 역할 4.5번
        to: contractAddress,
        data: inputData,
        gasPrice: web3.utils.toHex(2000000000),
        gasLimit: web3.utils.toHex(1000000),
        nonce: web3.utils.toHex(nonce),
      }
    } else { //여기는 이더 전송이라 데이터필드가 존재하지않음.
      txParam = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toHex(value),
        gasPrice: web3.utils.toHex(2000000000),
        gasLimit: web3.utils.toHex(1000000),
        nonce: web3.utils.toHex(nonce),
      }
    }
    const tx = new EthereumTx(txParam, { chain: network, hardfork: 'petersburg' }); //ethertx는 객체 생성

    const privateKey = Buffer.from(fromPrivateKey, 'hex');
    tx.sign(privateKey);// 2. 트랜잭션 서명

    const serializedTx = tx.serialize().toString('hex'); //직렬화시키는 부분

    // 서명된 트랜잭션 전파하기ㅜ 전파하면 기록
    //
    const { data: { txid } } = await instance.post('/rpc/pushTransaction', {txHex:serializedTx})
    // 
    //
    response.txid = txid;
    response.status = 'SUCCESS';
  } catch (e) {
    console.log(e);
    response.msg = e.message;
    response.status = 'FAIL';
  }
  res.json(response);
});

module.exports = router;

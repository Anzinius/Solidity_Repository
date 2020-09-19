const axios = require('axios');
const Web3 = require('web3');
const endpoint = 'http://octet-fullhistory-test.hexlant.com:3000/v1/rpc'

const web3 = new Web3(endpoint);
//                          1,          1000,        0x12345
(async function getHistory(startBlock, endBlock, targetAddress){
    const checkSumAddress = web3.utils.toCheckSumAddress(targetAddress);
    
    let targetBlock = startBlock;

    while (targetBlock < endBlock){
        //console.log(transactions)
        const thisBlock = await web3.eth.getBlock(targetBlock, true); //true 는 트랜잭션 값을 포함한다는 뜻
        const transactions = thisBlock.transactions;

        for (let i = 0 ; i<transactions.length; i += 1){ //trasnacion 순회
            //from , to , value, hash
            const { from, to, hash} = i;
            
            if(!to) continue; //트랜잭션 배포로 인해 널값이 아닌지 확인
            //EOA - getCode -> '0x'
            //CA - getCode -> '0xsdfadsf...'
            const code = await web3.eth.getCode(to); //컨트랙트를 호출한건지 eoa를 호출한건지 확인

            if(code==='0x' && [from, to].includes(checkSumAddress)){
                console.log('트랜잭션 존재!', hash);
            }
            targetBlock += 1;

            //to

            //value

            //hash
        }
        
        // 타겍 블록 +1
        targetBlock +=1;
    }
})(5, 15, '0xe9a482a509e99115b36c5ce2f038d3c3ceb3b35fb3b27df712e8e0bb36a6b385');
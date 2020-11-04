// mycontract 불러오고 노드 배포
const MyContract = artifacts.require("./MyContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract); // 이더리움 가상머신에 배포
};
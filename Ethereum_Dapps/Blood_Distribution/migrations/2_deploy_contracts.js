// mycontract 불러오고 노드 배포
const Blood1 = artifacts.require("./Blood1.sol");
const Blood2 = artifacts.require("./Blood2.sol");
const Blood3 = artifacts.require("./Blood3.sol");
const Blood4 = artifacts.require("./Blood4.sol");
const Blood5 = artifacts.require("./Blood5.sol");

module.exports = function(deployer) {
  deployer.deploy(Blood1); // 이더리움 가상머신에 배포
  deployer.deploy(Blood2); // 이더리움 가상머신에 배포
  deployer.deploy(Blood3); // 이더리움 가상머신에 배포
  deployer.deploy(Blood4); // 이더리움 가상머신에 배포
  deployer.deploy(Blood5); // 이더리움 가상머신에 배포

};
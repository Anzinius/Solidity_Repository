pragma solidity ^0.6.11;
contract HelloWord {
	string public greeting;
	function HelloWorld(string _greeting) {
		greeting = _greeting;
	}
	function setGreeting(string _greeting) {
		greeting = _greeting;
	}
	function say() constant returns(string) {
		return greeting;
	}
}
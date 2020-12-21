pragma solidity >=0.4.22 <0.6.0;

contract Blood2 { // Inbound of Blood to Blood Bank
   struct BankIn {
       string location;
       uint bloodId;
       uint date;
   }

   mapping(uint256 => BankIn) bankInInfo;

   event LogBloodInbound (
       uint _bloodId
       uint _date
   );

   function setInbound(uint _inboudNum, string memory _location, string memory _bloodId, uint _date) public {
       BankIn storage bankin = bankInInfo[_inboudNum];

       bankin.location = _location;
       bankin.bloodId = _bloodId;
       bankin.date = _date;
       
       emit LogBloodTransfusion(_bloodId, _date);
   }

   function getInbound(uint256 _inboudNum) public view returns (string memory, uint, uint) {
       return (bankInInfo[_inboudNum].location, bankInInfo[_inboudNum].bloodId, bankInInfo[_inboudNum].date);
   }
}
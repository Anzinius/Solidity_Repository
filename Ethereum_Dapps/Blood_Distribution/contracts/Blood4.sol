pragma solidity >=0.4.22 <0.6.0;

contract Blood4 { // Outbound of Blood to Blood bank
   struct BankOut {
       string location;
       uint bloodId;
       uint date;
   }

   mapping(uint256 => BankOut) bankOutInfo;

   event LogBloodOutbound (
       uint _bloodId
       uint _date
   );

   function setOutbound(uint _outboudNum, string memory _location, string memory _bloodId, uint _date) public {
       BankOut storage bankout = bankOutInfo[_outboudNum];

       bankout.location = _location;
       bankout.bloodId = _bloodId;
       bankout.date = _date;
       
       emit LogBloodTransfusion(_bloodId, _date);
   }

   function getOutbound(uint256 _outboudNum) public view returns (string memory, uint, uint) {
       return (bankOutInfo[_outboudNum].location, bankOutInfo[_outboudNum].bloodId, bankOutInfo[_outboudNum].date);
   }
}
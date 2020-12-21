pragma solidity >=0.4.22 <0.6.0;

contract Blood5 {   // Blood Transfusion
   struct Patient {
       string patientName;
       string gender;
       string blood;
       uint age;
   }

   mapping(uint256 => Patient) patientInfo;

   event LogBloodTransfusion (
       uint _patientId
   );

   function setPatientInfo(uint _patientId, string memory _name, string memory _gender, string memory _blood, uint _age) public {
       Patient storage patient = patientInfo[_patientId];

       patient.patientName = _name;
       patient.gender = _gender;
       patient.blood = _blood;
       patient.age = _age;
       
       emit LogBloodTransfusion(_patientId);
   }

   function getPatientInfo(uint256 _patientId) public view returns (string memory, string memory, uint) {
       return (patientInfo[_patientId].patientName, patientInfo[_patientId].gender, patientInfo[_patientId].age);
   }
}
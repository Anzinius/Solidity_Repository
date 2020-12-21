pragma solidity >=0.4.22 <0.6.0;

contract Blood1 { // Donor and Donor's Blood
   struct Donor {
       string donorName;
       string gender;
       string blood;
       uint age;
   }
    struct Blood {
    string type;
    uint date;
}

   mapping(uint256 => Donor) donorInfo;
   mapping(uint256 => Blood) bloodInfo;

   event LogBloodDonation (
       uint _donorId
       uint _bloodId
       string _type
   );

   function setDonorInfo(uint _donorId, string memory _name, string memory _gender, string memory _blood, uint _age) public {
       Donor storage donor = donorInfo[_donorId];

       donor.donorName = _name;
       donor.gender = _gender;
       donor.blood = _blood;
       donor.age = _age;
   }

   function setBloodInfo(uint _bloodId, string memory _type, uint _date) public {
       Blood storage blood = bloodInfo[_bloodId];

       blood.type = _type;
       blood.date = _date;
       
       emit LogBloodDonation(_donorId);
   }

   function getBloodInfo(uint256 _bloodId) public view returns (string memory, uint) {
       return (bloodInfo[_bloodId].type, bloodInfo[_bloodId].date);
   }
}
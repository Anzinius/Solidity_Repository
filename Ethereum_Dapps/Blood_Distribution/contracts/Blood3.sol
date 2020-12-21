pragma solidity >=0.4.22 <0.6.0;

contract Blood3 { // Blood test
   struct Exam {
       string item;
       string result;
   }

   mapping(uint256 => Exam) examInfo;

   event LogBloodExamination (
       uint _examNum
   );

   function Examination(uint _examNum, string memory _item, string memory _result) public {
       Exam storage exam = examInfo[_examNum];

       exam.item = _name;
       exam.result = _result;
       
       emit LogBloodExamination(_examNum);
   }

   function getExamInfo(uint256 _examNum) public view returns (string memory, string memory) {
       return (examInfo[_examNum].item, examInfo[_examNum].result);
   }
}
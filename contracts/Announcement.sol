// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Announcement {
  string public message;
  address public owner;

  constructor(string memory _message) {
    message = _message;
    owner = msg.sender;
  }

  function setMessage(string memory _message) public {
    require(owner==msg.sender);
    message = _message;
  }

}

contract ErrorHandle {
  event ErrorLog(string reason);

  function setMessage(string memory _message) public {
    Announcement a = new Announcement('');
    try  a.setMessage('') {
    } catch (bytes memory reason){
      emit ErrorLog("Cannot change, You are not the owner");
    }
  }
}

pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    // contract 생성 후 truffle compile 하면 컴파일이 되고 컴파일 하게되면 build가 생성됨 (json 파일) 
    // json 파일 내 - bytecode 블록체인 네트워크에 배포될 때 사용되는 바이트 코드
    
    address public owner; // 주소를 owner로 설정 // public으로 만들게 되면 자동으로 getter를 만들어 줌 // 외부에서 owner 값을 확인할 수 있게 됨

    // constructor는 스마트 컨트랙트가 생성될 때 가장 먼저 실행되는 함수 (배포가 될 때 보낸 사람으로 owner를 저장하겠다)
    constructor() public {
        owner = msg.sender;
    }

    function getSomeValue() public pure returns (uint256 value) {
        return 5;
    }
}

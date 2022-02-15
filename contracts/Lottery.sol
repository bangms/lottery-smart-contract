pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    struct BetInfo {
        uint256 answerBlockNumber; // 맞추려고 하는 정답 block
        address payable better; // 0.4.24? 이후 부터는 특정 주소에 돈을 보내려면 payable이라는 수식어를 붙여줘야 함 아니면 transfer 불가능
        byte challenges;

    }

    uint256 private _tail;
    uint256 private _head;
    mapping (uint256 => BetInfo) private _bets; //_bets라는 Queue 생성

    // contract 생성 후 truffle compile 하면 컴파일이 되고 컴파일 하게되면 build가 생성됨 (json 파일) 
    // json 파일 내 - bytecode 블록체인 네트워크에 배포될 때 사용되는 바이트 코드
    address public owner; // 주소를 owner로 설정 // public으로 만들게 되면 자동으로 getter를 만들어 줌 // 외부에서 owner 값을 확인할 수 있게 됨
    // constructor는 스마트 컨트랙트가 생성될 때 가장 먼저 실행되는 함수 (배포가 될 때 보낸 사람으로 owner를 저장하겠다)

    // 상수 정의
    uint256 constant internal BLOCK_LIMIT = 256;
    uint256 constant internal BET_BLOCK_INTERVAL = 3;
    uint256 constant internal BET_AMOUNT = 5 * 10 ** 15; // 배팅 금액 0.005이더로 고정
    // 18승 = 1이더 / 17 = 0.1 / 16 = 0.01 / 15 = 0.001
    uint256 private _pot;
    
    constructor() public {
        owner = msg.sender;
    }

    function getSomeValue() public pure returns (uint256 value) {
        return 5;
    }

    function getPot() public view returns (uint256 pot) {
        return _pot;
    }

    // Bet (베팅)
        // save the bet to the queue (값을 저장)
    
    // Distribute (검증)
        // check the answer (결과값을 검증)
        // 틀리면 pot 머니에 넣고 맞으면 돌려주는 연산

    function getBetInfo(uint256 index) public view returns (uint256 answerBlockNumber, address bettor, byte challenges) {
        BetInfo memory b = _bets[index];
        answerBlockNumber = b.answerBlockNumber;
        bettor = b.better;
        challenges = b.challenges;
    }

    function pushBet(byte challenges) public return (bool) {
        BetInfo memory b;
        b.bettor = msg.sender;
        b.answerBlockNumber = block.number + BET_BLOCK_INTERVAL;
        b.challenges = challenges;

        _bets[_tail] = b;
        _tail++;

        return true;
    }

    function popBet(uint256 index) public returns (bool) {
        // pop을 할 때 매핑이기 때문에 list에서 삭제하기 보다는
        // 단순하게 값을 초기화 하는 방식으로 진행
        // 맵에 있는 값을 delete 하게 되면 가스를 돌려받게 됨
        // 스마트 컨트랙트에서 코드를 실행할 때 사용하는 단위는 가스 
        // delete를 하게되면 데이터를 더이상 저장하지 않겠다 는 뜻 
        // statedatabase 상태데이터베이스에 저장하고 있는 값들을 그냥 뽑아오겠다. 없애겠다 라는 뜻이기 때문에 가스를 돌려받음
        // 필요하지 않는 값에 대해서는 delete를 해주는 것이 좋음
        delete _bets[index];
        return true;
    }
        
}

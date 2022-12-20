const Lottery = artifacts.require("Lottery");
// truffle test 하면 test 폴더 안에 있는 파일들이 전부 실행됨
// truffle test test/lottery.test.js 라고 파일명을 정확히 입력하면 해당 파일만 실행
const assertRevert = require("./assertRevert");
const expectEvent = require("./expectEvent");


contract('Lottery', function([deployer, user1, user2]){ // 순서대로 account 0, 1, 2 ... 번째가 들어옴
    let lottery; // 배포할 때 변수 먼저 만들어주고
    let betAmount = 5 * 10 ** 15; // 5000000000000000
    let bet_block_interval = 3;
    beforeEach(async () => {
        // console.log('Before Each');

        // 스마트 컨트랙트 배포
        lottery = await Lottery.new(); // 배포한 애 0xF76c9B7012c0A3870801eaAddB93B6352c8893DB
    })

    // 특정 케이스만 테스트 하고 싶을 경우 only 사용
    it('getPot should return current pot', async () => {
        let pot = await lottery.getPot();
        assert.equal(pot, 0);
    })

    describe('Bet', function () {
        it('should fail when the bet money is not 0.005 ETH', async () => {
            // Fail transaction
            await assertRevert(lottery.bet('0xab', {from: user1, value:4000000000000000}))
            // transaction object {chainId, value, to, from, gas(Limit), gasPrice}\
            //        네트워크 마다 다른 chainId, eth, address, 누가 보냈는지, 사용한 gas 값
            // 트랜잭션이 fail 나면 에러를 던지게 되는데 assertRevert에서 그 에러를 try catch문으로 받아서 
        })
        it.only('should put the bet to the bet queue with 1 bet', async () => {
            // Success transaction 
            
            // bet
            await lottery.bet('0xab', {from: user1, value:5000000000000000});
            let receipt = await lottery.bet('0xab', {from: user1, value:betAmount})
            // console.log(receipt);
            /* transaction receipt 출력 값
                transaction에 대한 hash 값
                어떤 블록에 마이닝 되었는지 
                그 블록의 hash 값
                가스를 얼마나 사용했는지
                contractAddress : 이 트랜잭션이 새로운 스마트 컨트랙트를 만들었을 경우
                시그니처 값
                로그값 
             */

            let pot = await lottery.getPot();
            assert.equal(pot, 0);

            // check contract balance == 0.005
            // truffle에서는 web3가 이미 주입되어 있기 때문에 따로 web3 provider를 쓸 필요 없이 그대로 사용하면 됨 
            let contractBalance = await web3.eth.getBalance(lottery.address);
            assert.equal(contractBalance, betAmount)

            // check bet info
            let currentBlockNumber = await web3.eth.getBlockNumber();
            let bet = await lottery.getBetInfo(0);

            assert.equal(bet.answerBlockNumber, currentBlockNumber + bet_block_interval)
            assert.equal(bet.bettor, user1) // user1 address가 잘 들어왔는지 확인
            assert.equal(bet.challenges, '0xab')

            // check log
            // console.log(receipt); // logs 안에 [] 배열 형태로 들어오고 그 안에 {} 객체 형태로 들어있음
            await expectEvent.inLogs(receipt.logs, 'BET'); // openjeplien에 helpers에 있는데 학습용으로 만들어봄
        })
    })
});

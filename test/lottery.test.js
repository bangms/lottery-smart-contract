const assertRevert = require("./assertRevert");
const expectEvent = require("./expectEvent");

const Lottery = artifacts.require("Lottery");
// truffle test 하면 test 폴더 안에 있는 파일들이 전부 실행됨
// truffle test test/lottery.test.js 라고 파일명을 정확히 입력하면 해당 파일만 실행

contract('Lottery', function([deployer, user1, user2]){ // 순서대로 account 0, 1, 2 ... 번째가 들어옴
    let lottery; // 배포할 때 변수 먼저 만들어주고
    let betAmount = 5 * 10 ** 15;
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
            // transaction object {chainId, value, to, from, gas(Limit), gasPrice}
        })
        it.only('should put the bet to the bet queue with 1 bet', async () => {
            // bet
            let receipt = await lottery.bet('0xab', {from: user1, value:betAmount})
            // console.log(receipt);

            let pot = await lottery.getPot();
            assert.equal(pot, 0);

            // check contract balance == 0.005
            let contractBalance = await web3.eth.getBalance(lottery.address);
            assert.equal(contractBalance, betAmount)

            // check bet info
            let currentBlockNumber = await web3.eth.getBlockNumber();
            let bet = await lottery.getBetInfo(0);

            assert.equal(bet.answerBlockNumber, currentBlockNumber + bet_block_interval)
            assert.equal(bet.bettor, user1)
            assert.equal(bet.challenges, '0xab')

            // check log
            // console.log(receipt);
            await expectEvent.inLogs(receipt.logs, 'BET');
        })
    })
});

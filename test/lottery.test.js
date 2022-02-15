const Lottery = artifacts.require("Lottery");
// truffle test 하면 test 폴더 안에 있는 파일들이 전부 실행됨
// truffle test test/lottery.test.js 라고 파일명을 정확히 입력하면 해당 파일만 실행

contract('Lottery', function([deployer, user1, user2]){ // 순서대로 account 0, 1, 2 ... 번째가 들어옴
    let lottery; // 배포할 때 변수 먼저 만들어주고
    beforeEach(async () => {
        console.log('Before Each');

        // 스마트 컨트랙트 배포
        lottery = await Lottery.new(); // 배포한 애 0xF76c9B7012c0A3870801eaAddB93B6352c8893DB
    })

    // 특정 케이스만 테스트 하고 싶을 경우 only 사용
    it.only('getPot should return current pot', async () => {
        let pot = await lottery.getPot();
        assert.equal(pot, 0);
    })
});

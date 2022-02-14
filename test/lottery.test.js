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

    it('Basic test', async () => {
        console.log('Basic test');
        // await 적어주어야 함
        let owner = await lottery.owner();
        let value = await lottery.getSomeValue();

        console.log(`owner ${owner}`);
        console.log(`value ${value}`);
        assert.equal(value, 5); // truffle에서는 기본적으로 assert를 주입시켜줌
        /* 
        Before Each
        Basic test
        owner 0xF76c9B7012c0A3870801eaAddB93B6352c8893DB
        value 5
        */
        // ####### 주의할 점
        // migrations에 있는 deploy 스크립트는 테스트 할 때 사용하지 않음
        // 여기서 배포한 (lottery = await Lottery.new()) 스마트 컨트랙트를 가지고 사용하는 게 가장 좋음
        // migrations를 돌지만 여기서 만든 클린 환경에서 사용하는 스마트 컨트랙트를 사용하는 것이 좋음
        // deploy에 있는 스크립트를 연계할 수도 있지만 ~~~ 

    })
});

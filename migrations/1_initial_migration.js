const Migrations = artifacts.require("Migrations"); 
// artifacts.require가 build 폴더 안에 있는 Migrations파일의 데이터를 가져옴
// migrations란 데이터를 가져와서 그 안에 있는 바이트코드를 가져와서 deployer가 deploy(배포)하는 형식

module.exports = function(deployer) {
  // deployer 는 어떻게 생기는가?
  // 실제 이더리움에서 스마트컨트랙트를 배포하기 위해서는 이더리움이 있는 주소가 있어야하는데 
  // truffle-config.js 에서 내가 사용할 주소를 세팅하고 그 주소를 통해서 이 주소가 deployer 변수에 매핑(injection)이 됨.
  // 이 deployer가 스마트 컨트랙트를 배포해주는 것
  deployer.deploy(Migrations); //  Migrations에 있는 바이트 코드를 가져와서 deployer가 deplo y(배포)하는 형식
};
/*
  배포를 하기 위해서는 사용할 블록체인 네트워크가 필요함 여기서는 ganache-cli을 사용
  ganache-cli -d -m tutorial
  
  항상 같은 주소와 같은 Private Keys를 가져오게 됨
  테스트를 할 때에도 metamask나 하드월렛 테스트를 할 때에도 같은 Private Keys를 import 해서 사용하면 됨
  -- Mnemonic (니모닉)이란, 지갑을 복구하기 위한 12 단어
  니모닉(mnemonic)을 import 하는 경우에도 tutorial을 사용하면 됨
  보통 니모닉이 12개 단어를 사용하기 때문에 열두개짜리 단어를 사용해도 되고 
  간단하게 하나짜리 단어를 사용해도 됨 (여기서는 tutorial)
*/

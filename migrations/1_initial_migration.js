const Migrations = artifacts.require("Migrations"); // artifacts.require가 build 폴더 안에 있는 Migrations파일의 데이터를 가져옴

module.exports = function(deployer) {
  // deployer 는 어떻게 생기는가?
  // 실제 이더리움에서 스마트컨트랙트를 배포하기 위해서는 이더리움이 있는 주소가 있어야하는데 
  // truffle-config.js 에서 내가 사용할 주소를 세팅하고 그 주소를 통해서 이 주소가 deployer 변수에 매핑(injection)이 됨.
  // 이 deployer가 스마트 컨트랙트를 배포해주는 것
  deployer.deploy(Migrations); //  Migrations에 있는 바이트 코드를 가져와서 deployer가 deplo y(배포)하는 형식
};
/*
  ganache-cli -d -m tutorial
  항상 같은 주소와 같은 Private Keys를 가져오게 됨
  테스트를 할 때에도 Private Keys를 import 해서 사용하면 됨
  
*/

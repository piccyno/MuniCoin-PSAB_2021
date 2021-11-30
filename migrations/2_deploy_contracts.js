const MuniCoin = artifacts.require("MuniCoin");
const Comune = artifacts.require("Comune");
// const MuniCoinFarm = artifacts.require("MuniCoinFarm");

function tokens(n) {

return web3.utils.toWei(n, 'ether')

}

module.exports = async function(deployer, network, accounts) {
	
  await deployer.deploy(MuniCoin);
  const muniCoin = await MuniCoin.deployed();
  
  await deployer.deploy(Comune, muniCoin.address);
  const comune = await Comune.deployed();
  
 
	
 // await deployer.deploy(MuniCoinFarm, muniCoin.address, comune.address);
 //  const muniCoinFarm = await MuniCoinFarm.deployed();
  

  
  // Trasferiamo 1M (TUTTI i nostri token) di MuniCoin alla MuniCoinFarm
//  await muniCoin.transfer( muniCoinFarm.address, '1000000000000000000000000');
  
  // Trasferiamo 100 eth al secondo account della blockchain ganache (l'investitore in questo esempio)
  //var investor = accounts[1]
  
  // await comune.transfer( investor,tokens('30'));
  
  
};

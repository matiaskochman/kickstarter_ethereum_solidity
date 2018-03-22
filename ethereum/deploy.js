const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const {metamask_wallet_password} = require('./metamask_wallet_password')

//console.log(metamask_wallet_password)
const provider = new HDWalletProvider(metamask_wallet_password,
'https://rinkeby.infura.io/p3M4EvN162hvHud2S5Z7');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attemping to deploy from account',accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data:compiledFactory.bytecode })
  .send({gas:'1000000',from:accounts[0]})

  //console.log(compiledFactory.interface);
  console.log('Contract deployed to: ',result.options.address);
}

deploy();

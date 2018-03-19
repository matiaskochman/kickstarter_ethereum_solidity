import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
  '0xC20F0347006Bf48207aF589167CDb4aed300d233')

console.log('instance: ',instance);

export default instance;

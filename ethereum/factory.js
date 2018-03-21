import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
  '0xbD4B5E5AA805b667e18538A9593be2A1778f8895')

console.log('instance: ',instance);

export default instance;

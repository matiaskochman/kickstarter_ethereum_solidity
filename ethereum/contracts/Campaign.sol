pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimun) public {
        Campaign newCampaign = new Campaign(minimun,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployerCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    Request[] public requests;
    address public manager;
    uint public minimunContrubution;
    mapping(address => bool) public approvers;
    uint public approversCount;


    function Campaign(uint minimun,address creator) public {
        manager = creator;
        minimunContrubution = minimun;
    }
    function contribute() public payable{
        require(msg.value > minimunContrubution);

        approversCount++;
        approvers[msg.sender] = true;
    }
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    function createRequest(string description,uint value, address recipient)
        public restricted {
            require(approvers[msg.sender]);

            Request memory newRequest = Request({
                description:description,
                value:value,
                recipient:recipient,
                complete:false,
                approvalCount:0
            });
            requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public {
       Request storage request = requests[index];

       require(!request.complete);
       require(request.approvalCount > (approversCount/2));

       request.recipient.transfer(request.value);
       request.complete = true;
    }
}

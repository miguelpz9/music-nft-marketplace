// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nusic is ERC721 {
    address owner;
    uint256 public tokenId;
    uint256 public singlesPrice = 0.002 ether;
    uint256 public collectionPrice = 0.005 ether;

    mapping(uint256 => uint256) public royalties;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol)
    {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT OWNER");
        _;
    }

    function getRoyalty(uint256 _tokenId) external view returns (uint256) {
        return royalties[_tokenId];
    }

    function mint(uint256 _royalty) public payable {
        require(msg.value >= singlesPrice, "INSUFFICIENT FUNDS");
        ++tokenId;
        royalties[tokenId] = _royalty;
        _mint(msg.sender, tokenId);
    }

    function createCollection() public payable {
        require(msg.value >= collectionPrice, "INSUFFICIENT FUNDS");
    }

    function withdraw() public onlyOwner {
        (bool hs, ) = payable(owner).call{value: address(this).balance}("");
        require(hs, "WITHDRAW_ERROR");
    }

    function setSinglesPrice(uint256 _newSinglesPrice) public onlyOwner {
        singlesPrice = _newSinglesPrice;
    }

    function setCollectionsPrice(uint256 _newCollectionPrice) public onlyOwner {
        collectionPrice = _newCollectionPrice;
    }

    function setOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}
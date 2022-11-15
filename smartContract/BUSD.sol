// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BUSD is ERC20 {
    address ALPHA = 0x2eA3bF6B653375fb8facfB67F19937E46840a7d4;
    address BETA = 0x9549FD2662102F768d20f769BB69938644078845;
    address GAMMA = 0xF7c1F7DD403594E3BBf03B2faCE017df664E2059;
    uint256 amount = 100 * 10 **18;
    
    constructor() ERC20("BinaceUSD","BUSD") {
        _mint(ALPHA,amount);
        _mint(BETA,amount);
        _mint(GAMMA,amount);
    } 
}
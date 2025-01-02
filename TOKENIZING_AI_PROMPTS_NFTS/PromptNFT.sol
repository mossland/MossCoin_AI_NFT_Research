// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract PromptNFT is ERC721URIStorage, Ownable, IERC2981 {
    uint256 public tokenCounter;
    mapping(uint256 => address) private _creators;
    mapping(uint256 => uint256) private _royalties;

    constructor() ERC721("PromptNFT", "PRMPT") {
        tokenCounter = 0;
    }

    function mintPrompt(string memory tokenURI, uint256 royaltyPercentage) public {
        require(royaltyPercentage <= 10000, "Royalty exceeds max percentage (100%)");
        uint256 tokenId = tokenCounter;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _creators[tokenId] = msg.sender;
        _royalties[tokenId] = royaltyPercentage;
        tokenCounter++;
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice) 
        external 
        view 
        override 
        returns (address receiver, uint256 royaltyAmount) 
    {
        require(_exists(tokenId), "Nonexistent token");
        uint256 royalty = (salePrice * _royalties[tokenId]) / 10000;
        return (_creators[tokenId], royalty);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, IERC165) 
        returns (bool) 
    {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }
}

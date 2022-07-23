// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title SuperclusterNFT contract
contract SuperclusterNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    //TrustedBroadcastAddress is the source of truth for broadcasting content to followers
    address public TrustedBroadcastAddress =
        0xebFE9190D00d61cA7dBCf00A0Cfdc6AE8E1B5264;

    event nftTransfer(address from, address to, uint256 tokenId);

    constructor() ERC721("Recipe", "coco") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /// @notice Allows changing of TrustedBroadcastAddress by owner
    /// @param _TBA The new Trusted Broadcast Address
    function setTBA(address _TBA) public onlyOwner {
        TrustedBroadcastAddress = _TBA;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        emit nftTransfer(from, to, tokenId);
        super._beforeTokenTransfer(from, to, tokenId);
    }
}

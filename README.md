# Supercluster NFT Code

This project can be used to deploy/mint NFTs. The contracts are based on [OpenZeppelin Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard).

The solidity contract adds the following to the default template:

- A TrustedBroadcastAddress address
- An nftTransfer event, that fires on transfers
- A setTBA(address \_TBA) function that allows the change of TrustedBroadcastAddress by owner

To use the Mint function, you will have to update the `contractAddress` to point to the NFT contract you want to mint.

For the HackFS22, we deployed the following NFT contracts:

```
  Green Warrior NFT Contract Address: 0x57E7546d4AdD5758a61C01b84f0858FA0752e940
  Mandelbrot Wizard NFT Contract Address: 0xEE232b653c862A2d94EC66F7f2596307Bc483dBE
  Galactic Traveler NFT Contract Address: 0xc9397648428436C6dd838bDaD2D5f484b80af7dA
  Recipe guardian Contract Address: 0x8900A5Cc4235392d9981D4C1dD373f13d89962Bb
```

A call can be made to the mint function to mint an NFT. The NFT function requires a wallet address and the NFT JSON URI as parameters.

Here is a list of the NFT JSONs for Supercluster:

```
  List of Supercluster NFT jsons:
  Green Warrior - "ipfs://bafkreih4msosv74zxrxffbgysc7dztu4ficbxqxjvc5u563cbun7zu5xm4"
  Mandelbrot Wizard - "ipfs://bafkreic23ytqfhkeoc5mwvpwlrl7m5q3m47cwkvjv7peenejxzlzeqswsy"
  Galactic Traveler - "ipfs://bafkreibdwudd4snhxuieck5nyq5ho6e5tohszbq47kn3uox7q7kkmcb2yq"
  Recipe Guardian - "ipfs://bafkreihvcifpkay3q7jzjqrdtrc34loqcw4iiquasl36xcpn3pj6dbla2y"
```

If you have any questions you can reach out to me on twitter @dysntr.

import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useMemo, useState } from "react";

// We instantiate the sdk on Rinkeby.
const sdk = new ThirdwebSDK("rinkeby");

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
	"0xD57740B66E31b44B342f4616E6A850C8cA0088cD",
);

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3();
	console.log("👋 Address:", address)

	const signer = provider ? provider.getSigner() : undefined;
	const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
	const [isClaiming, setIsClaiming] = useState(false);

	useEffect(() => {
		sdk.setProviderOrSigner(signer);
	}, [signer]);

	useEffect(() => {
		// If they don't have an connected wallet, exit!
		if (!address) {
			return;
		}

		// Check if the user has the NFT by using bundleDropModule.balanceOf
		return bundleDropModule
			.balanceOf(address, "0")
			.then((balance) => {
				// If balance is greater than 0, they have our NFT!
				if (balance.gt(0)) {
					setHasClaimedNFT(true);
					console.log("🌟 this user has a membership NFT!")
				} else {
					setHasClaimedNFT(false);
					console.log("😭 this user doesn't have a membership NFT.")
				}
			})
			.catch((error) => {
				setHasClaimedNFT(false);
				console.error("failed to nft balance", error);
			});
	}, [address]);

	if (!address) {
		return (
			<div className="landing">
				<h1>Welcome to CeceDAO</h1>
				<button onClick={() => connectWallet("injected")} className="btn-hero">
					Connect your wallet
				</button>
			</div>
		);
	}

	if (hasClaimedNFT) {
		return (
			<div className="member-page">
				<h1>🍪DAO Member Page</h1>
				<p>Congratulations on being a member</p>
			</div>
		);
	};

	const mintNft = () => {
		setIsClaiming(true);
		// Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
		bundleDropModule
			.claim("0", 1)
			.then(() => {
				// Set claim state.
				setHasClaimedNFT(true);
				// Show user their fancy new NFT!
				console.log(
					`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
				);
			})
			.catch((err) => {
				console.error("failed to claim", err);
			})
			.finally(() => {
				// Stop loading state.
				setIsClaiming(false);
			});
	}

	return (
		<div className="mint-nft">
			<h1>Mint your free 🍪DAO Membership NFT</h1>
			<button
				disabled={isClaiming}
				onClick={() => mintNft()}
			>
				{isClaiming ? "Minting..." : "Mint your nft (FREE)"}
			</button>
		</div>
	);
};

export default App;

import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0x8a809Fbb671712249AF1F4B193230Bc4E4C5A84e");

(async () => {
	try {
		// Deploy a standard ERC-20 contract.
		const tokenModule = await app.deployTokenModule({
			// What's your token's name? Ex. "Ethereum"
			name: "CeceDAOGovernanceToken",
			// What's your token's symbol? Ex. "ETH"
			symbol: "CECE",
		});
		console.log(
			"✅ Successfully deployed token module, address:",
			tokenModule.address,
		);
	} catch (error) {
		console.error("failed to deploy token module", error);
	}
})();

//  Successfully deployed ERC20 token module, address: 0x946AA3Daf2c85BE4e82fb452e3aCE3efD82FF906

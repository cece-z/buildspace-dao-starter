import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
	"0x45E4280c5eCe5B71a35fc122eC47d2a3403671Bc",
);

const tokenModule = sdk.getTokenModule(
	"0x946AA3Daf2c85BE4e82fb452e3aCE3efD82FF906",
);

(async () => {
	try {
		const amount = 4_200;
		// Create proposal to mint 4,200 new token to the treasury.
		await voteModule.propose(
			"Should the DAO mint an additional " + amount + " tokens into the treasury?",
			[
				{
					nativeTokenValue: 0,
					transactionData: tokenModule.contract.interface.encodeFunctionData(
						"mint",
						[
							voteModule.address,
							ethers.utils.parseUnits(amount.toString(), 18),
						]
					),
					// Our token module that actually executes the mint.
					toAddress: tokenModule.address,
				},
			]
		);

		console.log("✅ Successfully created proposal to mint tokens");
	} catch (error) {
		console.error("failed to create first proposal", error);
		process.exit(1);
	}

	try {
		const amount = 69;
		// Create proposal to transfer ourselves 69 tokens for being awesome.
		await voteModule.propose(
			"Should the DAO transfer " +
			amount + " tokens from the treasury to " +
			process.env.WALLET_ADDRESS + " for being awesome?",
			[
				{
					// Again, we're sending ourselves 0 ETH. Just sending our own token.
					nativeTokenValue: 0,
					transactionData: tokenModule.contract.interface.encodeFunctionData(
						// We're doing a transfer from the treasury to our wallet.
						"transfer",
						[
							process.env.WALLET_ADDRESS,
							ethers.utils.parseUnits(amount.toString(), 18),
						]
					),

					toAddress: tokenModule.address,
				},
			]
		);

		console.log(
			"✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
		);
	} catch (error) {
		console.error("failed to create second proposal", error);
	}
})();

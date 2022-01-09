import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
	"0x946AA3Daf2c85BE4e82fb452e3aCE3efD82FF906",
);

(async () => {
	try {
		const amount = 10_000;
		const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
		await tokenModule.mint(amountWith18Decimals);
		const totalSupply = await tokenModule.totalSupply();

		console.log(
			"✅ There now is",
			ethers.utils.formatUnits(totalSupply, 18),
			"$CECE in circulation",
		);
	} catch (error) {
		console.error("Failed to print money", error);
	}
})();

// https://rinkeby.etherscan.io/address/0x946AA3Daf2c85BE4e82fb452e3aCE3efD82FF906

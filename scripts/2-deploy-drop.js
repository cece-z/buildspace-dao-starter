import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x8a809Fbb671712249AF1F4B193230Bc4E4C5A84e");

(async () => {
	try {
		const bundleDropModule = await app.deployBundleDropModule({
			name: "CeceDAO Membership",
			description: "A DAO for Cece's experiments.",
			image: readFileSync("scripts/assets/cece_doodle.png"),
			primarySaleRecipientAddress: ethers.constants.AddressZero,
		});

		console.log(
			"✅ Successfully deployed bundleDrop module, address:",
			bundleDropModule.address,
		);
		console.log(
			"✅ bundleDrop metadata:",
			await bundleDropModule.getMetadata(),
		);
	} catch (error) {
		console.log("failed to deploy bundleDrop module", error);
	}
})()

//bundleDrop module, address: 0xD57740B66E31b44B342f4616E6A850C8cA0088cD

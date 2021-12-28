import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
	"0xD57740B66E31b44B342f4616E6A850C8cA0088cD",
);

(async () => {
	try {
		await bundleDrop.createBatch([
			{
				name: "CeceDao badge",
				description: "This NFT will give you access to CeceDAO!",
				image: readFileSync("scripts/assets/badge.png"),
			},
		]);
		console.log("✅ Successfully created a new NFT in the drop!");
	} catch (error) {
		console.error("failed to create the new NFT", error);
	}
})()

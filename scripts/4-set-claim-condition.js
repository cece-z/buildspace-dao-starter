import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
	"0xD57740B66E31b44B342f4616E6A850C8cA0088cD",
);

(async () => {
	try {
		const claimConditionFactory = bundleDrop.getClaimConditionFactory();
		// Specify conditions.
		claimConditionFactory.newClaimPhase({
			startTime: new Date(),
			maxQuantity: 100,
			maxQuantityPerTransaction: 1,
		});


		await bundleDrop.setClaimCondition(0, claimConditionFactory);
		console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
	} catch (error) {
		console.error("Failed to set claim condition", error);
	}
})()

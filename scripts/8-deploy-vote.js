import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
	"0x8a809Fbb671712249AF1F4B193230Bc4E4C5A84e",
);

(async () => {
	try {
		const voteModule = await appModule.deployVoteModule({
			name: "CeceDAO's Epic Proposals",

			// This is the location of our governance token, our ERC-20 contract!
			votingTokenAddress: "0x946AA3Daf2c85BE4e82fb452e3aCE3efD82FF906",

			// After a proposal is created, when can members start voting?
			// For now, we set this to immediately.
			proposalStartWaitTimeInSeconds: 0,

			// How long do members have to vote on a proposal when it's created?
			// Here, we set it to 24 hours (86400 seconds)
			proposalVotingTimeInSeconds: 24 * 60 * 60,

			// Will explain more below.
			votingQuorumFraction: 0,

			// What's the minimum # of tokens a user needs to be allowed to create a proposal?
			// I set it to 0. Meaning no tokens are required for a user to be allowed to
			// create a proposal.
			minimumNumberOfTokensNeededToPropose: "0",
		});

		console.log(
			"✅ Successfully deployed vote module, address:",
			voteModule.address,
		);
	} catch (err) {
		console.error("Failed to deploy vote module", err);
	}
})();

//Successfully deployed vote module, address: 0x45E4280c5eCe5B71a35fc122eC47d2a3403671Bc

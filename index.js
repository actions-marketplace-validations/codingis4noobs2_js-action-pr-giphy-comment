const { Octokit } = require('@octokit/rest');
const Giphy = require('giphy-api');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const githubToken = core.getInput('github-token');
        const giphyApiKey = core.getInput('giphy-api-key');

        const octokit = new Octokit({ auth: githubToken });
        const giphy = Giphy(giphyApiKey);

        const context = github.context;
        const { owner, repo, number } = context.issue;

        const prComment = await giphy.random('thank you');

        await octokit.issues.createComment({
            owner, 
            repo,
            issue_number,
            body: `### PR - ${number} \n ### 🥳 Thank you for the contribution! \n ![GIF](${prComment.data.images.downsized_small.url})`
        });
    } catch (error) {
        console.error('Error', error);
        process.exit(1);
    }
}

run();
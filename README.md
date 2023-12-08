<!-- <p align="center">
  <a href="https://github.com/AbsintheLabs/zeekaptcha">
    <img src="https://xmtp.org/img/logomark.svg" alt="zeekaptcha logo" width="300"/>
  </a>
</p> -->

<p align="center" style="font-size: 2em; margin-top: 0.67em; margin-bottom: 0.67em; font-weight: bold;">Zeekaptcha</p>
<!-- <h1 align="center" style="text-decoration: none;">Zeekaptcha</h1> -->
<h2 align="center">On-Chain Reputation and Sybil Protection</h2>
<br>

<p align="center">
    <!-- <a href="https://github.com/bacalhau-project/bacalhau/releases/" alt="Release">
        <img src="https://img.shields.io/github/v/release/bacalhau-project/bacalhau?display_name=tag" />
        </a> -->
    <!-- <a href="https://github.com/bacalhau-project/bacalhau/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/bacalhau-project/bacalhau" />
        </a> -->
    <!-- <a href="https://img.shields.io/github/downloads/bacalhau-project/bacalhau/total">
        <img src="https://img.shields.io/github/downloads/bacalhau-project/bacalhau/total" alt="total download">
        </a> -->
      <a href="https://t.me/absinthelabs"> <img src="https://img.shields.io/badge/@absinthelabs-2CA5E0.svg?logo=telegram&label=Telegram"> </a>
    <a href="https://twitter.com/intent/follow?screen_name=absinthe_labs">
        <img src="https://img.shields.io/twitter/follow/absinthe_labs?style=social&logo=twitter" alt="follow on Twitter">
        </a>
    <a href="https://www.absinthelabs.xyz/"> <img alt="AbsintheLabs website" src="https://img.shields.io/badge/website-absinthelabs.xyz-red"></a>
    <a href="" alt="Contributors">
        <img src="https://img.shields.io/badge/license-GNU GPL-green" />
      </a>
      <a href=https://www.npmjs.com/package/zeekaptcha> <img alt="npm" src="https://img.shields.io/npm/dt/zeekaptcha.svg"/> </a>
</p>

Zeekaptcha is the world’s first Web3 captcha. Unlike Web2 captchas, the verification is done in a smart contract enabling on-chain reputation, bot-resistant smart contract applications, and more.

<!-- Experience Zeekaptcha in action and claim some free Goerli ETH through our fully [on-chain bot protected faucet](https://drops.absinthelabs.xyz). -->

We have a vibrant community of developers helping each other in [our Telegram group](https://t.me/absinthelabs). Join us!

<!-- ## Quick Start

Get started with a simple webpage that creates Zeekaptcha attestions by running:

`npx create-zeekaptcha-app`

For a more detailed tutorial, visit our docs [here](https://absinthelabs.gitbook.io/zeekaptcha/). -->

## Install

`npm i zeekaptcha`

This library allows you to use the `<Zeekaptcha/>` React component to fetch a captcha, prove it, and submit the proof to the Sepolia blockchain.

To query blockchain events, import the `getEvents(address: string)` function to return the events for a given address. 

<!-- When using the component, set the chain you want to create attestations in this component parameter: <provide code here> -->

## Documentation

You can find the [documentation here!](https://absinthelabs.gitbook.io/absinthe-protect)

The docs are the best starting point as they give context for Zeekaptcha, go into how it works, and provide details on getting started. 

## Technology Overview 
Quick overview of the stack:

- Circom: Generates zero-knowledge proofs for proving correct solutions to the captchas.
- React: Efficient UI state management.
- Tailwind CSS: Employs Tailwind CSS for sleek and responsive design.
- API Integration: Challenges are fetched dynamically via a dedicated API. These challenges get recycled every 2 minutes.
- ethers.js: Creating the transaction to attest the captcha on-chain.

## Support

If you encounter any problems or have suggestions, please file an issue in the repo or [reach out to us on Telegram](https://t.me/absinthelabs).

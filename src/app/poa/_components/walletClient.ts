// Polkadot.js extension wrapper, client-only. Only imported from "use client"
// components and never bundled into server routes (the dapp package touches
// `window`).
//
// The mint flow uses this when `THESEUS_RPC_URL` is set: the controller's key
// lives in their browser extension, the page asks the extension to sign a
// nonce, the server verifies the signature against the agent's `owner` address.

import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";

export type WalletAccount = { address: string; name?: string; source: string };

const APP_NAME = "Proof of Agenthood";

export class NoExtensionError extends Error {
  constructor() {
    super("browser wallet extension not detected");
    this.name = "NoExtensionError";
  }
}

export class NoMatchingAccountError extends Error {
  constructor(public readonly controller: string) {
    super(`controller ${controller} is not in the connected wallet`);
    this.name = "NoMatchingAccountError";
  }
}

export async function connectWallet(): Promise<WalletAccount[]> {
  const enabled = await web3Enable(APP_NAME);
  if (enabled.length === 0) throw new NoExtensionError();
  const accounts = await web3Accounts();
  return accounts.map((a) => ({
    address: a.address,
    name: a.meta.name,
    source: a.meta.source,
  }));
}

export async function signNonceWithController(
  controller: string,
  message: string,
): Promise<string> {
  const accounts = await connectWallet();
  const match = accounts.find((a) => a.address === controller);
  if (!match) throw new NoMatchingAccountError(controller);
  const injector = await web3FromAddress(controller);
  if (!injector.signer.signRaw) {
    throw new Error("injector does not support signRaw");
  }
  const result = await injector.signer.signRaw({
    address: controller,
    data: stringToHex(message),
    type: "bytes",
  });
  return result.signature;
}

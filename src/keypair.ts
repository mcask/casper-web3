// @flow
import { Ed25519 } from "casper-js-sdk/dist/lib/Keys";
import PublicKey from "./publickey";

/**
 * Keypair signer interface
 */
export interface Signer {
  publicKey: PublicKey;
  secretKey: Uint8Array;
}

/**
 * Ed25519 Keypair
 */
export interface Ed25519Keypair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

/**
 * An account keypair used for signing transactions.
 */
class Keypair {
  /** @internal */
  _v: Ed25519;

  /**
   * Create a new keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair ed25519 keypair
   */
  constructor(keypair?: Ed25519Keypair) {
    if (keypair) {
      this._v = new Ed25519(keypair);
    } else {
      this._v = Ed25519.new();
    }
  }

  /**
   * Generate a new random keypair
   */
  static generate(): Keypair {
    return new Keypair();
  }

  /**
   * The public key for this keypair
   */
  get publicKey(): PublicKey {
    return new PublicKey(this._v.publicKey);
  }

  /**
   * The raw secret key for this keypair
   */
  get secretKey(): Uint8Array {
    return this._v.privateKey;
  }
}

export default Keypair;

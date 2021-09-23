// @flow
import * as nacl from "tweetnacl";

import { AsymmetricKey, Ed25519 } from "casper-js-sdk/dist/lib/Keys";
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
   * Create a keypair from a raw secret key byte array.
   *
   * This method should only be used to recreate a keypair from a previously
   * generated secret key. Generating keypairs from a random seed should be done
   * with the {@link Keypair.fromSeed} method.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array
   * @param options: skip secret key validation
   */
  static fromSecretKey(
    secretKey: Uint8Array,
    options?: { skipValidation?: boolean }
  ): Keypair {
    const keypair = nacl.sign.keyPair.fromSecretKey(secretKey);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("@casper/key-validation-input");
      const signature = nacl.sign.detached(signData, keypair.secretKey);
      if (!nacl.sign.detached.verify(signData, signature, keypair.publicKey)) {
        throw new Error("provided secretKey is invalid");
      }
    }
    return new Keypair(keypair);
  }

  /**
   * Generate a keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */
  static fromSeed(seed: Uint8Array): Keypair {
    return new Keypair(nacl.sign.keyPair.fromSeed(seed));
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

  /**
   * Casper implementation specific key
   */
  get value(): AsymmetricKey {
    return this._v;
  }
}

export default Keypair;

// @flow
import { CLPublicKey } from "casper-js-sdk";
import { CASPER_SCHEMA, Struct } from "./util/borsh-schema";
import { Buffer } from "buffer";

// This should be exposed from casper-js-sdk
const ED25519_LENGTH = 32;

/**
 * Value to be converted into public key
 */
export type PublicKeyInitData = string | Uint8Array | CLPublicKey;

function isCLPublicKey(value: PublicKeyInitData): value is CLPublicKey {
  return (value as CLPublicKey).data !== undefined;
}

/**
 * A public key
 */
class PublicKey extends Struct {
  private _v: CLPublicKey;

  /**
   * Create a new Publickey object
   * @param value ed25519 public key as buffer or hex encoded string
   */
  constructor(value: PublicKeyInitData) {
    super({});
    if (isCLPublicKey(value)) {
      this._v = value
    } else {
      if (typeof value === "string") {
        // assume hex encoding by default
        this._v = CLPublicKey.fromHex(value);
      } else {
        this._v = CLPublicKey.fromEd25519(value);
      }
      if (this._v.value().length > ED25519_LENGTH) {
        throw new Error(`Invalid public key input`);
      }
    }
  }

  /**
   * Default public key value. (All zeroes)
   */
  static default: PublicKey = new PublicKey("00000000000000000000000000000000");

  /**
   * Checks if two publicKeys are equal
   */
  equals(publicKey: PublicKey): boolean {
    const first = this._v.value();
    const second = publicKey._v.value();
    return (
      first.length === second.length &&
      first.every((value, index) => value === second[index])
    );
  }

  /**
   * Return the byte array representation of the public key
   */
  toBytes(): Uint8Array {
    return this._v.value();
  }

  /**
   * Return the base-58 representation of the public key
   */
  toString(): string {
    return this._v.toHex();
  }

  /**
   * Find a valid program address
   *
   * Valid program addresses must fall off the ed25519 curve.  This function
   * iterates a nonce until it finds one that when combined with the seeds
   * results in a valid program address.
   */
  static async findProgramAddress(
    seeds: Array<Buffer | Uint8Array>,
    programId: PublicKey,
  ): Promise<[PublicKey, number]> {
    // TODO: Need to figure out how this translates to Casper
    // let nonce = 255;
    // let address;
    // while (nonce != 0) {
    //   try {
    //     const seedsWithNonce = seeds.concat(Buffer.from([nonce]));
    //     address = await this.createProgramAddress(seedsWithNonce, programId);
    //   } catch (err) {
    //     if (err instanceof TypeError) {
    //       throw err;
    //     }
    //     nonce--;
    //     continue;
    //   }
    //   return [address, nonce];
    // }
    throw new Error(`Unable to find a viable program address nonce`);
  }
}

CASPER_SCHEMA.set(PublicKey, {
  kind: 'struct',
  fields: [['_v', 'u256']],
});

export default PublicKey;

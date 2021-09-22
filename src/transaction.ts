import {PublicKey} from './publickey';

/**
 * Transaction signature as base-58 encoded string
 */
export type TransactionSignature = string;

/**
 * Account metadata used to define instructions
 */
export type AccountMeta = {
  /** An account's public key */
  pubkey: PublicKey;
  /** True if an instruction requires a transaction signature matching `pubkey` */
  isSigner: boolean;
  /** True if the `pubkey` can be loaded as a read-write account. */
  isWritable: boolean;
};

/**
 * Transaction Instruction class
 */
export class TransactionInstruction {

}


/**
 * Transaction class
 */
export class Transaction {

}

/**
 * The level of commitment desired when querying state
 * <pre>
 *   'processed': Query the most recent block which has reached 1 confirmation by the connected node
 *   'confirmed': Query the most recent block which has reached 1 confirmation by the cluster
 *   'finalized': Query the most recent block which has been finalized by the cluster
 * </pre>
 */
export type Commitment =
  | 'processed'
  | 'confirmed'
  | 'finalized'
  | 'recent' // Deprecated as of v1.5.5
  | 'single' // Deprecated as of v1.5.5
  | 'singleGossip' // Deprecated as of v1.5.5
  | 'root' // Deprecated as of v1.5.5
  | 'max'; // Deprecated as of v1.5.5

/**
 * A connection to a fullnode JSON RPC endpoint
 */
export class Connection {

}

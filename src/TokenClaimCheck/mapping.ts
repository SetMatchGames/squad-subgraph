import { store } from "@graphprotocol/graph-ts"
import { Redeem } from "../../generated/TokenClaimCheck/TokenClaimCheck"
import { License } from "../../generated/schema"

export function handleRedeem(event: Redeem): void {
  store.remove('License', event.params.claimId.toHex())
}
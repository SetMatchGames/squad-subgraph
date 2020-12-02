import { store } from "@graphprotocol/graph-ts"
import { Redeem } from "../../generated/TokenClaimCheck/TokenClaimCheck"
import { License, Contribution } from "../../generated/schema"

export function handleRedeem(event: Redeem): void {
  let license = License.load(event.params.claimId.toHex())
  let contribution = Contribution.load(license.contribution)
  contribution.supply = contribution.supply.minus(event.params.amount)
  contribution.save()
  store.remove('License', event.params.claimId.toHex())
}
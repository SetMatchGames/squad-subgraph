import { BigInt } from "@graphprotocol/graph-ts"
import {
  BuyLicense,
  NewContribution
} from "../../generated/SquadController/SquadController"
import { License, Contribution } from "../../generated/schema"

export function handleNewContribution(event: NewContribution): void {
  let contribution = new Contribution(event.params.contributionId.toHex())
  contribution.name = event.params.name
  contribution.beneficiary = event.params.beneficiary
  contribution.feeRate = event.params.feeRate
  contribution.purchasePrice = event.params.purchasePrice
  contribution.definition = event.params.metadata
  contribution.supply = new BigInt(0)
  contribution.save()
}

export function handleBuyLicense(event: BuyLicense): void {
  let license = new License(event.params.licenseId.toHex())
  license.owner = event.params.buyer
  license.amount = event.params.amount
  license.price = event.params.price
  let contributionId = event.params.contributionId.toHex()
  license.contribution = contributionId
  license.save()

  // update contribution supply
  let contribution = Contribution.load(contributionId)
  if (contribution === null) return
  contribution.supply = contribution.supply.plus(event.params.amount)
  contribution.save()

  /*
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.buyer = event.params.buyer
  entity.contributionId = event.params.contributionId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.accounting(...)
  // - contract.bondingCurveFactory(...)
  // - contract.contributions(...)
  // - contract.curve(...)
  // - contract.exists(...)
  // - contract.holdsLicense(...)
  // - contract.maxNetworkFeeRate(...)
  // - contract.networkFeeRate(...)
  // - contract.owner(...)
  // - contract.priceOf(...)
  // - contract.reserveDust(...)
  // - contract.tokenAddress(...)
  // - contract.tokenClaimCheck(...)
  // - contract.totalSupplyOf(...)
  // - contract.treasury(...)
  // - contract.validLicenses(...)
  */
}

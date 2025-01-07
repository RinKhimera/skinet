import { StepperSelectionEvent } from '@angular/cdk/stepper'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox'
import { MatStepperModule } from '@angular/material/stepper'
import { RouterLink } from '@angular/router'
import { StripeAddressElement, StripePaymentElement } from '@stripe/stripe-js'
import { firstValueFrom } from 'rxjs'
import { AccountService } from '../../core/services/account.service'
import { SnackbarService } from '../../core/services/snackbar.service'
import { StripeService } from '../../core/services/stripe.service'
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component'
import { Address } from '../../shared/models/user'
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component'

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    MatButton,
    RouterLink,
    MatCheckboxModule,
    CheckoutDeliveryComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private stripeService = inject(StripeService)
  private snackbar = inject(SnackbarService)
  private accountService = inject(AccountService)
  addressElement?: StripeAddressElement
  paymentElement?: StripePaymentElement
  saveAddress = false

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement()
      this.addressElement.mount('#address-element')

      this.paymentElement = await this.stripeService.createPaymentElement()
      this.paymentElement.mount('#payment-element')
    } catch (error: any) {
      this.snackbar.error(error.message)
    }
  }

  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripeAddress()
        address && firstValueFrom(this.accountService.updateAddress(address))
      }
    }
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent())
    }
  }

  private async getAddressFromStripeAddress(): Promise<Address | null> {
    const result = await this.addressElement?.getValue()
    const address = result?.value.address

    if (address) {
      return {
        line1: address.line1,
        line2: address.line2 || undefined,
        city: address.city,
        country: address.country,
        state: address.state,
        postalCode: address.postal_code,
      }
    } else return null
  }

  onSaveAddressCheckboxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked
  }

  ngOnDestroy(): void {
    this.stripeService.disposeElements()
  }
}

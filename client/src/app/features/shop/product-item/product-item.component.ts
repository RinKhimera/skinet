import { CurrencyPipe } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { Product } from '../../../shared/models/product'

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardContent,
    CurrencyPipe,
    MatCardActions,
    MatButton,
    MatIcon,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product
}
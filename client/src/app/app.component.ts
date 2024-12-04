import { HttpClient } from '@angular/common/http'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ShopService } from './core/services/shop.service'
import { ShopComponent } from './features/shop/shop.component'
import { HeaderComponent } from './layout/header/header.component'
import { Pagination } from './shared/models/pagination'
import { Product } from './shared/models/product'

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Skinet'
}

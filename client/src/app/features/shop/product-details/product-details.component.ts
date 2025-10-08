import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, CurrencyPipe, MatButton, MatIcon],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  product?: Product;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: product => this.product = product,
      error: error => {
        // Error is now handled by the error interceptor
        // which will show appropriate toast messages
      }
    })
  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  addToCart() {
    // For now, just show a success message
    this.toastService.success('Product added to cart successfully!');
  }
}

import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<Product>();

  protected readonly primaryImage = computed(() => {
    const images = this.product().images;
    return images.length > 0 ? images[0] : '/images/logo-honda.webp';
  });

  protected readonly productUrl = computed(() => `/product/${this.product().slug}`);
}

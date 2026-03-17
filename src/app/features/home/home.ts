import { Component, inject, signal, computed, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { DealerService } from '../../core/services/dealer.service';
import { SiteConfigService } from '../../core/services/site-config.service';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  protected readonly productService = inject(ProductService);
  protected readonly dealerService = inject(DealerService);
  protected readonly site = inject(SiteConfigService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly featured = this.productService.featured;
  protected readonly dealers = this.dealerService.dealers;
  protected readonly products = this.productService.products;

  protected readonly banners = signal<string[]>([
    '/images/banners/nuevo-honda-navi-web.webp',
    '/images/banners/bannerpcx160.webp',
    '/images/banners/banner-home-xr-190-web.webp',
  ]);

  protected readonly currentSlide = signal(0);
  private carouselInterval: ReturnType<typeof setInterval> | null = null;

  protected readonly featuredColors = signal([
    { label: 'Negro', value: '#1a1a1a', outline: false },
    { label: 'Rojo', value: '#D5150D', outline: false },
    { label: 'Blanco', value: '#cccccc', outline: true },
  ]);

  protected whatsappUrl(message: string): string {
    return `https://api.whatsapp.com/send?phone=573159923447&text=${encodeURIComponent(message)}`;
  }

  protected prevSlide(): void {
    this.currentSlide.update((i) => (i === 0 ? this.banners().length - 1 : i - 1));
    this.resetInterval();
  }

  protected nextSlide(): void {
    this.currentSlide.update((i) => (i === this.banners().length - 1 ? 0 : i + 1));
    this.resetInterval();
  }

  protected goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.resetInterval();
  }

  private resetInterval(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.carouselInterval !== null) {
      clearInterval(this.carouselInterval);
    }
    this.startInterval();
  }

  private startInterval(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.carouselInterval = setInterval(() => {
      this.currentSlide.update((i) => (i === this.banners().length - 1 ? 0 : i + 1));
    }, 5000);
  }

  ngOnInit(): void {
    this.startInterval();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval !== null) {
      clearInterval(this.carouselInterval);
    }
  }
}

import { Component, input, signal, computed, ChangeDetectionStrategy, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGallery {
  readonly images = input.required<string[]>();
  readonly thumbnails = input<string[]>([]);

  protected readonly selectedIndex = signal(0);
  protected readonly zooming = signal(false);
  protected readonly zoomX = signal(50);
  protected readonly zoomY = signal(50);

  private readonly zoomContainer = viewChild<ElementRef<HTMLDivElement>>('zoomContainer');

  protected readonly currentImage = computed(() => {
    const imgs = this.images();
    const idx = this.selectedIndex();
    return imgs[idx] ?? imgs[0] ?? '';
  });

  protected readonly displayThumbnails = computed(() => {
    const thumbs = this.thumbnails();
    return thumbs.length > 0 ? thumbs : this.images();
  });

  selectImage(index: number) {
    this.selectedIndex.set(index);
  }

  onMouseEnter() {
    this.zooming.set(true);
  }

  onMouseMove(event: MouseEvent) {
    const container = this.zoomContainer()?.nativeElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.zoomX.set(x);
    this.zoomY.set(y);
  }

  onMouseLeave() {
    this.zooming.set(false);
  }
}

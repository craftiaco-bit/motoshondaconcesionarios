import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'factu',
    renderMode: RenderMode.Client,
  },
  {
    path: 'factu/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'certi',
    renderMode: RenderMode.Client,
  },
  {
    path: 'certi/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

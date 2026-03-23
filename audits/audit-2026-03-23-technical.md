# Auditoría SEO Técnica — Motos Honda Concesionarios
**Fecha**: 23 de marzo, 2026  
**Sitio**: https://www.motoshondaconcesionarios.com  
**Auditor**: Craftia SEO Agency

---

## Executive Summary

**Overall Score**: 65/100  
**Critical Issues**: 3  
**Warnings**: 5  
**Opportunities**: 8

El sitio tiene una buena base técnica (HTTPS, structured data, canonical tags) pero tiene problemas críticos de configuración del servidor que afectan directamente el SEO.

---

## Critical Issues ❌

### 1. robots.txt no existe (Devuelve HTML)
- **Status**: ❌ CRÍTICO
- **Problem**: El servidor devuelve la página HTML principal en lugar de un archivo robots.txt válido
- **Impact**: Google no puede determinar qué páginas rastrear/excluir
- **Evidence**: 
  ```bash
  curl -I https://www.motoshondaconcesionarios.com/robots.txt
  # HTTP/2 200 
  # content-type: text/html; charset=utf-8  ← DEBE ser text/plain
  ```

**Fix**: Crear archivo `public/robots.txt` en Angular:
```txt
User-agent: *
Allow: /

Sitemap: https://www.motoshondaconcesionarios.com/sitemap.xml
```

### 2. sitemap.xml no existe (Devuelve HTML)
- **Status**: ❌ CRÍTICO
- **Problem**: Al igual que robots.txt, el servidor devuelve HTML en lugar del XML del sitemap
- **Impact**: Google no puede descubrir todas las páginas eficientemente
- **Evidence**: 
  ```bash
  curl -s https://www.motoshondaconcesionarios.com/sitemap.xml | head -5
  # <!DOCTYPE html><html lang="es"...
  ```

**Fix**: Generar sitemap dinámico en Angular (usar `@analogjs/router` o manual):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.motoshondaconcesionarios.com/</loc>
    <lastmod>2026-03-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.motoshondaconcesionarios.com/product/honda-cb-190r</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Agregar todas las páginas -->
</urlset>
```

### 3. Configuración Angular "catch-all" problemática
- **Status**: ❌ CRÍTICO
- **Problem**: Angular está configurado para servir `index.html` para TODAS las rutas, incluyendo /robots.txt y /sitemap.xml
- **Root Cause**: En `angular.json` o servidor de producción (Vercel), hay un rewrite que redirige todo a index.html

**Fix**: Excluir rutas específicas del catch-all:
- Vercel: Agregar `rewrites` específicos en `vercel.json`
- Angular Universal: Configurar rutas estáticas antes del catch-all

---

## High Priority ⚠️

### 4. Meta robots tag correcto ✅
- **Status**: ✅ GOOD
- **Current**: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
- **Action**: No se requiere cambio

### 5. Canonical tag correcto ✅
- **Status**: ✅ GOOD
- **Current**: `<link rel="canonical" href="https://www.motoshondaconcesionarios.com/">`
- **Action**: No se requiere cambio

### 6. Google Site Verification ✅
- **Status**: ✅ GOOD
- **Current**: `<meta name="google-site-verification" content="Ko6Zpj8i5t9eXqzv1HTar-412C3RWV00gsTlCHT7rr8">`
- **Action**: No se requiere cambio

### 7. HTTPS y Security Headers ✅
- **Status**: ✅ GOOD
- **Current**: `strict-transport-security: max-age=63072000`
- **Recommendation**: Agregar más headers de seguridad:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### 8. Structured Data (JSON-LD) ✅
- **Status**: ✅ EXCELLENT
- **Current**: MotorcycleDealer + WebSite schema
- **Coverage**: 
  - ✅ LocalBusiness (MotorcycleDealer)
  - ✅ ContactPoint
  - ✅ OpeningHours
  - ✅ GeoCoordinates
  - ✅ OfferCatalog (productos)
  - ✅ SearchAction (sitelinks search box)
- **Action**: Agregar `Product` schema individual para cada moto en sus páginas de detalle

---

## Medium Priority 📋

### 9. Google Analytics (gtag.js) ✅
- **Status**: ✅ GOOD
- **Current**: Google Ads tag (AW-18025237044)
- **Missing**: Google Analytics 4 (GA4) - solo está configurado Google Ads
- **Recommendation**: Agregar GA4 para métricas de tráfico

### 10. Open Graph / Social Tags ✅
- **Status**: ✅ GOOD
- **Coverage**: Facebook/WhatsApp + Twitter
- **Action**: Verificar que la imagen OG sea accesible y tenga las dimensiones correctas (1200x630)

### 11. Mobile Optimization
- **Status**: ⚠️ NEEDS VERIFICATION
- **Current**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Action**: Verificar touch targets (mínimo 48x48px) y responsive breakpoints

### 12. Performance (Core Web Vitals)
- **Status**: ⚠️ UNKNOWN (requiere PageSpeed API)
- **Action**: Ejecutar PageSpeed Insights API para obtener métricas reales

---

## Low Priority 📝

### 13. Favicon Setup ✅
- **Status**: ✅ GOOD
- **Current**: Múltiples formatos (ico, webp) + apple-touch-icon
- **Action**: No se requiere cambio

### 14. Font Loading
- **Status**: ⚠️ REVIEW
- **Current**: Google Fonts (Montserrat, Oxanium, Poppins) con `font-display: swap`
- **Action**: Considerar self-hosting para reducir DNS lookups

### 15. Content Security
- **Status**: ⚠️ UNKNOWN
- **Action**: Verificar si hay Content-Security-Policy headers

---

## Action Plan Inmediato

### Día 1: Fix Críticos (SEO Technical)
1. [ ] Crear `public/robots.txt` en proyecto Angular
2. [ ] Generar `public/sitemap.xml` con todas las URLs
3. [ ] Configurar Vercel para servir archivos estáticos antes del Angular catch-all

### Día 2: Configuración de Herramientas
1. [ ] Configurar Google Analytics 4
2. [ ] Verificar Google Search Console está verificado
3. [ ] Configurar PageSpeed Insights API key en `.env`

### Día 3: Auditoría Profunda
1. [ ] Ejecutar PageSpeed Insights API
2. [ ] Auditar mobile responsiveness
3. [ ] Verificar touch targets y accessibility

---

## Resources

- **Google Search Console**: https://search.google.com/search-console
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Schema Markup Validator**: https://validator.schema.org
- **Robots.txt Tester**: https://search.google.com/search-console/robots-testing

---

## Correcciones Aplicadas ✅ (23 Mar 2026)

### 1. robots.txt creado
- **Archivo**: `public/robots.txt`
- **Contenido**: User-agent directives + Sitemap URL
- **Status**: ✅ FIXED

### 2. sitemap.xml creado
- **Archivo**: `public/sitemap.xml`
- **Contenido**: 21 URLs (homepage + 20 productos)
- **Status**: ✅ FIXED

### 3. Vercel rewrite configurado
- **Archivo**: `vercel.json`
- **Configuración**: Headers específicos para Content-Type + rewrites
- **Status**: ✅ FIXED

### Próximos pasos para deploy
1. [ ] Hacer commit de los cambios
2. [ ] Push a develop branch
3. [ ] Deploy automático en Vercel
4. [ ] Verificar en production con:
   ```bash
   curl -I https://www.motoshondaconcesionarios.com/robots.txt
   curl -I https://www.motoshondaconcesionarios.com/sitemap.xml
   ```
5. [ ] Submit sitemap en Google Search Console

---

*Informe generado por Craftia SEO Agency*
*Última actualización: 23 de marzo, 2026*
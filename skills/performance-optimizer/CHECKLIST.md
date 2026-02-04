# Audit Pre-Publish: Lightning Check
**Creat de:** Performance Engineer Skill

Înainte de a publica un nou skill sau o pagină, "Paznicul Digital" trebuie să bifeze următoarele criterii de viteză:

- [ ] **Image Weight:** Nicio imagine unitară nu depășește **150KB** (folosiți Squoosh.app sau engine-ul intern pentru compresie).
- [ ] **Alt Format:** Toate imaginile mari au variantă `.webp` sau `.avif` servită prin elementul `<picture>`.
- [ ] **Lazy Loading:** Atributul `loading="lazy"` este prezent pe toate imaginile de sub "fold" (secțiunile de Noutăți, Galerie, Footer).
- [ ] **CLS Guard:** Toate imaginile au atributele `width` și `height` setate în HTML pentru a rezerva spațiu.
- [ ] **Font Subsetting:** Google Fonts includ parametrul `&display=swap`.
- [ ] **Unused CSS:** Verificarea stilurilor pentru a elimina clasele redundante care nu aparțin de Design System.
- [ ] **JS Payload:** Scripturile externe (Hărți, Video) sunt încărcate cu `defer` sau `async`.

### Target Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

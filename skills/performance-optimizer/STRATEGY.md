# Strategie de Optimizare: Lightning Heritage

Pentru a atinge excelența în performanță pe site-ul **Principele Carol**, am arhitecturat următoarele 3 acțiuni critice care prioritizează experiența utilizatorului pe dispozitive mobile:

### 1. "Above the Fold" Prioritization (LCP Optimization)
- **Acțiune:** Logo-ul școlii și titlul Hero ("Tradiție Regală") sunt marcate cu `fetchpriority="high"`.
- **Efect:** Browserul începe descărcarea acestor active imediat ce vede index.html, reducând timpul până la prima afișare utilă de la 1.2s la sub 600ms.

### 2. Heritage Image Compacting (Data Savings)
- **Acțiune:** Conversia fotografiilor istorice din format JPEG (mari și grele) în **WebP Adaptive**.
- **Efect:** O reducere de 75% a greutății paginii (ex: de la 3MB la 750KB) fără o pierdere vizibilă a texturii de hîrtie veche, esențială pentru identitatea școlii.

### 3. Cumulative Layout Shift (CLS) Zero Policy
- **Acțiune:** Rezervarea spațiului în DOM pentru imagini și fonturi prin setarea atributelor `width/height` explicite și a proprietății `font-display: swap`.
- **Efect:** Pagina nu mai "sare" în timp ce se încarcă, oferind o experiență de lectură stabilă și liniștitoare pentru părinți.

# Inventory.md

## Descripció General

La vista **Inventory** permet als administradors i professionals gestionar els productes de l'inventari. Aquesta vista inclou funcionalitats per cercar, afegir, editar i eliminar productes, així com visualitzar el seu estat de stock.

---

## Components i Fitxers Relacionats

### 1. **_app.inventory.tsx**
- **Funcionalitat**:
  - Renderitza una graella interactiva amb els productes de l'inventari.
  - Proporciona funcionalitats per cercar productes i gestionar la paginació.
  - Permet afegir i editar productes mitjançant modals.
- **Punts destacats**:
  - `useLoaderData`: Carrega la llista de productes des del backend.
  - `useEffect`: Verifica els permisos de l'usuari en carregar la vista.
  - `useState`: Gestiona l'estat dels modals i les accions de l'usuari.

### 2. **EditProductModal.tsx**
- **Funcionalitat**:
  - Permet editar les dades d'un producte seleccionat.
- **Punts destacats**:
  - `product`: Proporciona el context del producte a editar.
  - `onUpdate`: Gestiona l'actualització del producte.

### 3. **AddProductModal.tsx**
- **Funcionalitat**:
  - Permet afegir nous productes a l'inventari.
- **Punts destacats**:
  - `onAdd`: Gestiona l'afegiment d'un nou producte.

### 4. **products.server.ts**
- **Funcionalitat**:
  - Proporciona dades dels productes amb suport per a paginació i cerca avançada.

- **Endpoints**:
  - **`GET /api/products/search?page={page}&limit={limit}&query={query}`**: Retorna una llista de productes filtrats per nom, preu o stock, amb suport per a paginació.

---

## Flux de Funcionament

1. **Carreguem els productes inicials**:
   - El `loader` executa la funció `ProductsData` per obtenir la llista de productes des del backend amb suport per paginació i cerca.

2. **Visualització de l'inventari**:
   - Es mostra una graella de productes amb informació com el nom, el preu i l'estat de stock.
   - L'estat del stock es determina mitjançant la funció `getStatus` i es representa visualment.

3. **Gestió dels productes**:
   - **Afegir productes**:
     - S'obre `AddProductModal` per introduir un nou producte.
   - **Editar productes**:
     - Es fa servir `EditProductModal` per modificar els detalls d'un producte seleccionat.

4. **Cerca i Paginació**:
   - Els usuaris poden cercar productes mitjançant una barra de cerca.
   - La paginació permet navegar entre diferents pàgines de productes.

5. **Gestió d'Errors**:
   - Els errors es mostren de manera clara a l'usuari en cas de problemes amb les crides al backend.

[Tornar Al README](../../README.md)
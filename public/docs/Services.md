# Services.md

## Descripció General

La vista **Services** proporciona una interfície per consultar i interactuar amb els serveis disponibles a l'aplicació. 

Els usuaris poden veure detalls dels serveis mitjançant un modal i realitzar accions com reservar o actualitzar serveis.

---

## Components i Fitxers Relacionats

### 1. **_app.services.tsx**
- **Funcionalitat**:
  - Renderitza una graella amb targetes per a cada servei.
  - Permet obrir un modal per veure els detalls d'un servei seleccionat.
  - Realitza crides per obtenir dades de l'usuari autenticat.
- **Punts destacats**:
  - `useLoaderData`: Carrega la llista de serveis des del backend.
  - `useEffect`: Obtenim dades de l'usuari autenticat en carregar la vista.
  - Gestiona la visibilitat i contingut del modal amb `useState`.

### 2. **ViewServiceModal.tsx**
- **Funcionalitat**:
  - Mostra els detalls complets d'un servei seleccionat.
  - En cas de ser administrador/professional, permet actualitzar el servei.
  - En cas de ser usuari, permet reservar el servei.
- **Punts destacats**:
  - `isOpen`: Controla la visibilitat del modal.
  - `onUpdate` i `onReserve`: Gestionen accions personalitzades sobre el servei.

### 3. **services.server.ts**
- **Funcionalitat**:
  - Backend que proporciona la llista de serveis disponibles.
- **Endpoints**:
  - **`GET /api/services`**: Retorna una llista completa de serveis disponibles.

---

## Flux de Funcionament

1. **Carreguem els serveis**:
   - El `loader` executa la funció `ServicesData`, que retorna la llista de serveis des del backend.
   - Aquesta llista es passa al component amb `useLoaderData`.

2. **Renderitzem el Grid de Serveis**:
   - Es mostra una graella de targetes amb detalls visuals bàsics dels serveis.

3. **Interaccions amb el Modal**:
   - Quan l'usuari selecciona un servei, s'obre `ViewServiceModal` per mostrar els detalls.
   - Les accions disponibles inclouen actualitzar el servei en el cas de ser administrador/profesional o reservar-lo com a usuari.

4. **Gestió d'errors**:
   - Si les crides al backend fallen, els errors es gestionen mostrant missatges a la consola i prevenint accions innecessàries.

[Tornar Al README](../../README.md)
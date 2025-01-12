# Users.md

## Descripció General

La vista **Users** permet gestionar els usuaris registrats a l'aplicació. Aquesta vista ofereix funcionalitats per cercar, afegir, editar, eliminar usuaris, així com accedir a l'historial de cites i informes d'usuaris.

---

## Components i Fitxers Relacionats

### 1. **_app.users.tsx**
- **Funcionalitat**:
  - Renderitza una llista d'usuaris amb opcions per editar, eliminar o accedir a l'historial de cites i informes.
  - Inclou una barra de cerca per filtrar usuaris.
  - Gestió de la paginació per carregar usuaris en pàgines.
- **Punts destacats**:
  - `useLoaderData`: Carrega la llista d'usuaris des del backend.
  - `useEffect`: Verifica els permisos de l'usuari en carregar la vista.
  - Gestiona l'estat dels modals amb `useState`.

### 2. **AddUserModal.tsx**
- **Funcionalitat**:
  - Permet registrar un nou usuari al sistema.
- **Punts destacats**:
  - `onClose`: Tanca el modal després de completar l'acció.

### 3. **EditUserModal.tsx**
- **Funcionalitat**:
  - Permet editar la informació d'un usuari existent.
- **Punts destacats**:
  - `onUpdate`: Gestiona l'actualització de l'usuari.
  - `onClose`: Tanca el modal després de completar l'acció.

### 4. **DeleteUserModal.tsx**
- **Funcionalitat**:
  - Proporciona una interfície per confirmar l'eliminació d'un usuari.
- **Punts destacats**:
  - `onDelete`: Executa l'acció d'eliminar l'usuari.
  - `onClose`: Tanca el modal després de completar l'acció.

### 5. **AppointmentHistoryModal.tsx**
- **Funcionalitat**:
  - Mostra l'historial de cites d'un usuari seleccionat.
- **Punts destacats**:
  - `clientId`: Filtra les cites basades en l'usuari seleccionat.
  - `onClose`: Tanca el modal després de consultar l'historial.

### 6. **UserReportModal.tsx**
- **Funcionalitat**:
  - Mostra un informe específic d'un usuari seleccionat.
- **Punts destacats**:
  - `user`: Proporciona el context de l'usuari per a l'informe.
  - `onClose`: Tanca el modal després de consultar l'informe.

### 7. **users.server.ts**
- **Funcionalitat**:
  - Proporciona dades dels usuaris amb suport per a la paginació i la cerca avançada.
  - Permet obtenir usuaris filtrats per nom, correu electrònic o nom d'usuari.

- **Endpoints**:
  - **`GET /api/users/search?page={page}&limit={limit}&query={query}`**: Retorna una llista d'usuaris segons els paràmetres de pàgina, límit i criteris de cerca.

---

## Flux de Funcionament

1. **Carreguem la llista d'usuaris**:
   - El `loader` executa la funció `UsersData`, que retorna la llista d'usuaris amb la informació necessària per a la vista.
   - Aquesta llista es passa al component mitjançant `useLoaderData`.

2. **Cerca d'usuaris**:
   - Els usuaris poden ser cercats mitjançant la barra de cerca, que filtra els resultats segons el nom, correu o usuari.

3. **Interaccions amb els Modals**:
   - Es poden afegir, editar, eliminar usuaris, i consultar el seu historial de cites o informes mitjançant els modals corresponents.

4. **Paginació**:
   - La vista implementa un sistema de paginació per carregar grans volums d'usuaris de manera eficient.

5. **Gestió d'Errors**:
   - Els errors es mostren clarament a l'usuari, com ara problemes de càrrega de dades o accions no autoritzades.

[Tornar Al README](../../README.md)
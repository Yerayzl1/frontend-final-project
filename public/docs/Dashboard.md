# Dashboard.md

## Descripció General

La vista **Dashboard** és el punt principal de control per als administradors i professionals. 

Aquesta vista ofereix una visibilitat completa de l'estat general de l'aplicació, incloent estadístiques sobre clients, cites, serveis i productes. A més, permet gestionar cites i afegir nous clients mitjançant modals.

---

## Components i Fitxers Relacionats

### 1. **_app.dashboard.tsx**
- **Funcionalitat**:
  - Mostra les estadístiques clau de clients, cites, serveis i productes.
  - Renderitza una llista de les cites pròximes amb opcions per editar o eliminar.
  - Permet accedir als modals per afegir noves cites o clients.
- **Punts destacats**:
  - `useLoaderData`: Carrega dades proporcionades pel backend.
  - `useEffect`: Verifica els permisos de l'usuari en carregar la pàgina.
  - Gestió de modals amb `useState`.

### 2. **DeleteAppointmentModal.tsx**
- **Funcionalitat**:
  - Renderitza un modal per confirmar l'eliminació d'una cita.
  - Fa una petició DELETE a l'API per eliminar la cita seleccionada.
- **Punts destacats**:
  - `handleDelete`: Gestiona la petició DELETE.
  - Tanca el modal un cop completada l'acció.

### 3. **NewAppointmentModal.tsx**
- **Funcionalitat**:
  - Permet crear noves cites seleccionant client, professional, servei, data i hora.
  - Validació dels camps i errors del servidor.
- **Punts destacats**:
  - `fetchSelectableData`: Obté dades auxiliars com clients, professionals i serveis.
  - `handleSubmit`: Fa una petició POST per registrar la nova cita.

### 4. **NewClientModal.tsx**
- **Funcionalitat**:
  - Permet registrar un nou client amb informació com nom, correu electrònic i telèfon.
  - Inclou una opció per activar o desactivar el client.
- **Punts destacats**:
  - `handleSubmit`: Gestiona l'enviament de les dades a l'API.
  - Maneja errors retornats pel servidor.

### 5. **dashboard.server.ts**
- **Funcionalitat**:
  - Backend que proporciona les dades necessàries per renderitzar el Dashboard.
  - Calcula estadístiques clau i retorna una llista de cites pròximes.

- **Endpoints**:
  - **`GET /api/dashboard/clients-count`**: Retorna el nombre total de clients registrats.
  - **`GET /api/dashboard/appointments-count`**: Retorna el nombre total de cites registrades.
  - **`GET /api/dashboard/services-count`**: Retorna el nombre total de serveis disponibles.
  - **`GET /api/dashboard/products-count`**: Retorna el nombre total de productes disponibles en l'inventari.
  - **`GET /api/appointments/search?limit=4`**: Retorna les 4 cites més pròximes.

---

## Flux de Funcionament

1. **Carreguem les estadístiques i cites**:
   - El `loader` de Remix executa la funció `DashboardData` que retorna les dades necessàries.
   - `useLoaderData` s'encarrega de carregar aquestes dades al component.

2. **Interacció amb l'usuari**:
   - **Nova Cita**:
     - S'obre `NewAppointmentModal` per seleccionar dades com client i professional.
     - La petició POST registra la cita.
   - **Eliminar Cita**:
     - Es mostra `DeleteAppointmentModal` per confirmar l'eliminació.
     - Una petició DELETE elimina la cita del backend.
   - **Nou Client**:
     - Es renderitza `NewClientModal` per registrar el nou client.

3. **Gestió d'errors**:
   - Els errors de l'API es capturen i es mostren de forma clara a l'usuari.

[Tornar Al README](../../README.md)
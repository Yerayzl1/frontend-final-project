# Appointments.md

## Descripció General

La vista **Appointments** permet als administradors i professionals gestionar les cites registrades al sistema. Aquesta vista inclou funcionalitats per consultar, editar i eliminar cites, així com suport per a la paginació i cerca.

---

## Components i Fitxers Relacionats

### 1. **_app.appointments.tsx**
- **Funcionalitat**:
  - Renderitza una llista de cites amb detalls com el client, el professional, la data i el preu.
  - Proporciona funcionalitats per editar i eliminar cites mitjançant modals.
  - Inclou paginació i barra de cerca per facilitar la navegació.
- **Punts destacats**:
  - `useLoaderData`: Carrega la llista de cites des del backend amb suport per a paginació.
  - `useEffect`: Verifica els permisos de l'usuari en carregar la vista.
  - `useState`: Gestiona l'estat dels modals i l'element seleccionat.

### 2. **EditAppointmentModal.tsx**
- **Funcionalitat**:
  - Permet editar els detalls d'una cita seleccionada.
- **Punts destacats**:
  - `appointment`: Proporciona el context de la cita a editar.
  - `onUpdate`: Gestiona l'actualització de la cita.

### 3. **DeleteAppointmentModal.tsx**
- **Funcionalitat**:
  - Renderitza un modal per confirmar l'eliminació d'una cita.
- **Punts destacats**:
  - `appointmentId`: Identificador de la cita a eliminar.
  - `onDelete`: Gestiona l'eliminació de la cita.

### 4. **appointments.server.ts**
- **Funcionalitat**:
  - Gestiona la lògica per obtenir dades de les cites amb suport per a paginació i funcionalitats de cerca avançada.

- **Endpoints**:
  - **`GET /api/appointments/search?page={page}&limit={limit}&query={query}`**: Retorna una llista de cites filtrades per criteris com servei, professional, client, data d'inici, preu total o mètode de pagament.

---

## Flux de Funcionament

1. **Carreguem les cites inicials**:
   - El `loader` executa la funció `AppointmentsData` per obtenir la llista de cites des del backend.
   - `useLoaderData` carrega aquestes dades al component.

2. **Visualització de les cites**:
   - Es mostra una llista amb informació com el client, el professional, la data, el preu i el mètode de pagament.

3. **Gestió de les cites**:
   - **Editar cites**:
     - Es fa servir `EditAppointmentModal` per modificar els detalls d'una cita seleccionada.
   - **Eliminar cites**:
     - Es fa servir `DeleteAppointmentModal` per confirmar i gestionar l'eliminació de cites.

4. **Cerca i Paginació**:
   - Els usuaris poden cercar cites utilitzant la barra de cerca.
   - La paginació permet navegar entre diferents pàgines de cites.

5. **Gestió d'Errors**:
   - Els errors es mostren de manera clara a l'usuari en cas de problemes amb les crides al backend.

[Tornar Al README](../../README.md)
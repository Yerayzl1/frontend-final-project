# Service&Appointment.md

## Descripció General

La vista **Service&Appointment** ofereix una interfície per gestionar serveis i cites. Permet als administradors consultar gràfics sobre rendiments, gestionar serveis existents i administrar les cites recents mitjançant accions com editar o eliminar.

---

## Components i Fitxers Relacionats

### 1. **_app.service.tsx**
- **Funcionalitat**:
  - Mostra gràfics sobre cites realitzades i ingressos generats.
  - Renderitza una llista de cites recents amb opcions per editar o eliminar.
  - Mostra una llista de serveis amb opcions per editar o eliminar serveis existents.
- **Punts destacats**:
  - `useLoaderData`: Carrega les dades necessàries des del backend.
  - `useEffect`: Verifica els permisos de l'usuari.
  - `useState`: Gestiona l'estat dels modals i els elements seleccionats.

### 2. **EditAppointmentModal.tsx**
- **Funcionalitat**:
  - Permet editar els detalls d'una cita seleccionada.
- **Punts destacats**:
  - `appointment`: Context de la cita a editar.
  - `onUpdate`: Gestiona l'actualització de la cita.

### 3. **DeleteAppointmentModal.tsx**
- **Funcionalitat**:
  - Renderitza un modal per confirmar l'eliminació d'una cita.
- **Punts destacats**:
  - `appointmentId`: Identificador de la cita a eliminar.
  - `onDelete`: Gestiona l'eliminació de la cita.

### 4. **EditOneServiceModal.tsx**
- **Funcionalitat**:
  - Permet editar els detalls d'un servei seleccionat.
- **Punts destacats**:
  - `service`: Context del servei a editar.
  - `onUpdate`: Gestiona l'actualització del servei.

### 5. **DeleteServiceModal.tsx**
- **Funcionalitat**:
  - Renderitza un modal per confirmar l'eliminació d'un servei.
- **Punts destacats**:
  - `service`: Context del servei a eliminar.
  - `onDelete`: Gestiona l'eliminació del servei.

### 6. **Chart.tsx**
- **Funcionalitat**:
  - Mostra gràfics interactius basats en les dades carregades.
- **Punts destacats**:
  - Admet dades dinàmiques i opcions configurables.

### 7. **service.server.ts**
- **Funcionalitat**:
  - Gestiona la lògica per obtenir dades de serveis i cites, incloent ingressos i informació recent.

- **Endpoints**:
  - **`POST /api/services/done`**: Retorna dades sobre serveis completats i ingressos per un període de temps específic.
  - **`GET /api/appointments/search?limit=4`**: Retorna una llista de les 4 cites més recents.
  - **`GET /api/services`**: Retorna una llista completa dels serveis disponibles.

---

## Flux de Funcionament

1. **Carreguem les dades inicials**:
   - El `loader` executa la funció `ServiceData`, que retorna dades sobre cites, ingressos i serveis des del backend.
   - `useLoaderData` carrega aquestes dades al component.

2. **Visualització dels gràfics**:
   - Es renderitzen gràfics per mostrar les cites realitzades i els ingressos generats.

3. **Gestió de cites**:
   - Es poden editar o eliminar cites mitjançant els modals `EditAppointmentModal` i `DeleteAppointmentModal`.

4. **Gestió de serveis**:
   - Es poden editar o eliminar serveis utilitzant els modals `EditOneServiceModal` i `DeleteServiceModal`.

5. **Interacció amb l'usuari**:
   - Accions com consultar cites recents o gestionar serveis estan disponibles directament des de la interfície.

6. **Gestió d'Errors**:
   - Els errors es gestionen mostrant missatges clars a l'usuari.

[Tornar Al README](../../README.md)
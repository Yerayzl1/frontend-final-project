# Professionals.md

## Descripció General

La vista **Professionals** proporciona una interfície per gestionar els professionals que formen part de l'organització. A més, permet consultar estadístiques sobre cites i gestionar informes relacionats amb l'activitat dels professionals.

---

## Components i Fitxers Relacionats

### 1. **_app.professionals.tsx**
- **Funcionalitat**:
  - Mostra estadístiques clau sobre cites (avui, setmana, mes i any).
  - Renderitza una llista dels professionals disponibles amb detalls com nom, correu electrònic i estat.
  - Permet accedir a modals per afegir, modificar professionals i gestionar informes.
- **Punts destacats**:
  - `useLoaderData`: Carrega les dades proporcionades pel backend.
  - `useEffect`: Verifica els permisos de l'usuari en carregar la pàgina.
  - `useState`: Gestiona l'estat dels modals i la informació mostrada.

### 2. **AddProfessionalModal.tsx**
- **Funcionalitat**:
  - Permet afegir nous professionals al sistema.
- **Punts destacats**:
  - `onAdd`: Gestiona l'afegiment d'un nou professional.
  - Tanca el modal després de completar l'acció.

### 3. **ManageProfessionalsModal.tsx**
- **Funcionalitat**:
  - Proporciona eines per modificar els professionals existents.
- **Punts destacats**:
  - `onUpdate`: Gestiona l'actualització d'un professional.
  - Mostra els professionals disponibles en un formulari editable.

### 4. **AddReportModal.tsx**
- **Funcionalitat**:
  - Permet afegir nous informes relacionats amb l'activitat dels professionals.
- **Punts destacats**:
  - Permet vincular informes amb professionals específics.

### 5. **ManageReportsModal.tsx**
- **Funcionalitat**:
  - Proporciona eines per visualitzar els informes existents.
- **Punts destacats**:
  - Mostra una llista d'informes amb les dades mostrades.

### 6. **Chart.tsx**
- **Funcionalitat**:
  - Renderitza gràfics visuals per representar dades dels informes.
- **Punts destacats**:
  - Suporta dades dinàmiques i opcions configurables.

### 7. **professionals.server.ts**
- **Funcionalitat**:
  - Backend que proporciona dades sobre professionals, informes i estadístiques de cites.
  - Calcula dades específiques per intervals de temps i retorna una llista de professionals i informes.

- **Endpoints**:
  - **`GET /api/professionals/today/count`**: Retorna el nombre total de cites programades per avui.
  - **`GET /api/professionals/week/count`**: Retorna el nombre total de cites programades per aquesta setmana.
  - **`GET /api/professionals/month/count`**: Retorna el nombre total de cites programades per aquest mes.
  - **`GET /api/professionals/year/count`**: Retorna el nombre total de cites programades per aquest any.
  - **`GET /api/professionals/professional-status`**: Retorna l'estat dels professionals (actiu o inactiu).
  - **`GET /api/professionals/reports`**: Retorna una llista d'informes sobre els professionals.

---

## Flux de Funcionament

1. **Carreguem dades inicials**:
   - El `loader` executa la funció `ProfessionalsData` per obtenir estadístiques, professionals i informes des del backend.
   - `useLoaderData` s'encarrega de carregar aquestes dades al component.

2. **Visualització d'estadístiques**:
   - Es mostra un conjunt de targetes amb les estadístiques de cites (avui, setmana, mes i any).

3. **Gestió de professionals**:
   - Es pot afegir un professional mitjançant `AddProfessionalModal`.
   - Es poden modificar els professionals existents amb `ManageProfessionalsModal`.

4. **Gestió d'informes**:
   - Es poden afegir nous informes amb `AddReportModal`.
   - Es poden modificar informes existents amb `ManageReportsModal`.

5. **Gràfics dels informes**:
   - Els informes es mostren com gràfics dinàmics utilitzant el component `Chart`.

[Tornar Al README](../../README.md)
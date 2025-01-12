# Calendar.md

## Descripció General

La vista **Calendar** ofereix una interfície visual per visualitzar i gestionar esdeveniments mitjançant una integració amb el servei de calendaris de Google. 

Aquesta vista permet als usuaris autenticats veure els seus esdeveniments en una vista interactiva.

---

## Components i Fitxers Relacionats

### 1. **_app.calendar.tsx**
- **Funcionalitat**:
  - Mostra un calendari interactiu utilitzant FullCalendar.
  - Gestiona l'autenticació amb Google per accedir als esdeveniments del calendari.
  - Permet carregar i visualitzar esdeveniments directament des de l'API de Google.
- **Punts destacats**:
  - `useEffect`: Gestiona el flux d'autenticació i la càrrega dels esdeveniments.
  - `useState`: Emmagatzema l'estat de l'autenticació, els esdeveniments i errors.
  - FullCalendar: Proporciona la interfície visual del calendari.

---

## Endpoints
- **`GET /api/google/check-auth`**: Comprova si l'usuari està autenticat amb Google.
- **`GET /api/google/auth-url`**: Retorna l'URL necessari perquè l'usuari pugui autenticar-se amb Google.
- **`GET /api/google/events`**: Recupera i retorna la llista d'esdeveniments del calendari de l'usuari.

---

## Flux de Funcionament

1. **Comprovació d'Autenticació**:
   - La vista comprova si l'usuari està autenticat utilitzant l'endpoint **`GET /api/google/check-auth`**.
   - Si l'usuari no està autenticat, es mostra un botó per redirigir a l'URL d'autenticació obtingut amb **`GET /api/google/auth-url`**.

2. **Càrrega d'Esdeveniments**:
   - Un cop autenticat, es fa una crida a l'endpoint **`GET /api/google/events`** per obtenir els esdeveniments del calendari.
   - Els esdeveniments es processen i es formaten per ser compatibles amb FullCalendar.

3. **Visualització del Calendari**:
   - El calendari interactiu permet veure els esdeveniments en diferents vistes: mensual, setmanal i diària.

4. **Gestió d'Errors**:
   - Els errors es gestionen mostrant missatges clars a l'usuari, com errors d'autenticació o problemes en la càrrega d'esdeveniments.

[Tornar Al README](../../README.md)
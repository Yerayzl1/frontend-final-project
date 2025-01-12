# ByJesi - Frontend

Aquest projecte és una aplicació web completa desenvolupada utilitzant **Remix**, **React**, **TailwindCSS**, i **TypeScript** en el frontend.

## Estructura del projecte

### `app`
Conté tota la lògica principal del frontend:

#### `components`
- **data**
  - `appointments.server.ts`: Gestió de les dades de cites.
  - `calendar.server.ts`: Funcionalitat relacionada amb el calendari.
  - `dashboard.server.ts`: Gestió de dades pel tauler de control.
  - `products.server.ts`: Manipulació de dades dels productes.
  - `professionals.server.ts`: Lògica per gestionar professionals.
  - `services.server.ts`: Gestió dels serveis.
  - `users.server.ts`: Gestió d'usuaris.
- **Navbar.tsx**: Barra de navegació principal.
- **Charts.tsx**: Components gràfics per visualitzar dades.
- **ProfessionalNavbar.tsx**: Barra de navegació específica pels professionals.
- **UserNavbar.tsx**: Barra de navegació pels usuaris.

#### `routes`
Carpetes per gestionar diferents funcionalitats:

- **appointments**
  - `AppointmentHistoryModal.tsx`: Modal per veure l'historial de cites.
  - `DeleteAppointmentModal.tsx`: Modal per eliminar una cita.
  - `EditAppointmentModal.tsx`: Modal per editar una cita.
  - `NewAppointmentModal.tsx`: Modal per afegir una nova cita.

- **clients**
  - `NewClientModal.tsx`: Modal per registrar nous clients.

- **products**
  - `AddProductModal.tsx`: Modal per afegir un nou producte.
  - `EditProductModal.tsx`: Modal per editar un producte existent.

- **professionals**
  - `AddProfessionalModal.tsx`: Modal per afegir professionals.
  - `ManageProfessionalsModal.tsx`: Gestió de professionals.
  - `UpdateProfessionalModal.tsx`: Modal per actualitzar la informació dels professionals.

- **reports**
  - `AddReportModal.tsx`: Modal per afegir informes.
  - `ManageReportsModal.tsx`: Modal per gestionar els informes existents.
  - `UserReportModal.tsx`: Informes relacionats amb els usuaris.

- **services**
  - `DeleteServiceModal.tsx`: Modal per eliminar serveis.
  - `EditOneServiceModal.tsx`: Modal per editar un servei específic.
  - `ViewServiceModal.tsx`: Visualització d'informació detallada dels serveis.

- **users**
  - `AddUserModal.tsx`: Modal per afegir nous usuaris.
  - `DeleteUserModal.tsx`: Modal per eliminar un usuari.
  - `EditUserModal.tsx`: Modal per editar la informació d'un usuari.

### Vistes
**Mostrarem una descripció completa de cada vista.**
- [Dashboard](./public/docs/Dashboard.md)
- [Services](./public/docs/Services.md)
- [Calendar](./public/docs/Calendar.md)
- [Professionals](./public/docs/Professionals.md)
- [Users](./public/docs/Users.md)
- [Service&Appointment](./public/docs/Service&Appointment.md)
- [Inventory](./public/docs/Inventory.md)
- [Appointments](./public/docs/Appointments.md)

#### Fitxers d'arrel del frontend
- **`root.tsx`**: Punt d'entrada principal del frontend.
- **`tailwind.css`**: Configuració d'estils amb TailwindCSS.
- **`vite.config.ts`**: Configuració del projecte amb Vite.

## Funcionalitats principals
1. **Gestió de cites:** Crear, editar, eliminar i consultar cites.
2. **Gestió d'usuaris:** Registre, actualització i eliminació d'usuaris.
3. **Gestió de serveis:** Crear, visualitzar, editar i eliminar serveis.
4. **Gestió de productes:** Afegir i modificar productes.
5. **Gestió de professionals:** Administrar els professionals que formen part de l'organització.
6. **Informes:** Generació i visualització d'informes.
7. **Calendari:** Planificació i visualització de cites.
8. **Autenticació:** Gestió de sessió per usuaris autenticats.

## Scripts disponibles
- `npm install`: Instal·la totes les dependències necessàries.
- `npm run dev`: Inicia el servidor de desenvolupament.
- `npm run build`: Genera la versió optimitzada per producció.
- `npm run start`: Inicia el servidor en mode de producció.

## Estil visual
El projecte utilitza **TailwindCSS** per proporcionar una interfície moderna i responsiva. També s'han creat components personalitzats per modalitats, formularis i gràfics.

## Configuració
- **API_TOKEN**: El fitxer `.env` ha de contenir el token necessari per interactuar amb l'API backend.

## Publicació
Els fitxers estàtics es troben a la carpeta `public`, incloent imatges, ícons, i altres recursos necessaris.

## Documentació extensa
La documentació mostrada a aquest README, esta reduida i detallada sobre el desenvolupament frontal de la aplicació. La documentació original del projecte es troba al següent enllaç:

[Carpeta amb la documentació original](https://drive.google.com/drive/folders/1CQivHpZ3Lf0tLycfJsCwwl2AZeXaPeXk?usp=sharing)
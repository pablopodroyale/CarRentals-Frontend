# 🚗 CarRental - Frontend

This is the frontend of the **CarRental** application, developed using **Angular Standalone Components**, TailwindCSS, and NgCharts. It allows users to view statistics, manage rentals, and see upcoming scheduled services for vehicles.

---

## 📦 Requirements

- Node.js `v18+` recommended  
- Angular CLI `v16+`  
- npm or yarn  
- Backend running at `https://localhost:7126` (default)

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/pablopodroyale/CarRentals-Frontend.git
cd carrental-frontend

Install the dependencies:

npm install

▶️ Running the project
ng serve

The application will be available at:
http://localhost:4200/

🧱 Project structure
src/
├── app/
│   ├── core/                 # Domain models and logic
│   ├── infraestructure/      # HTTP services and API access
│   ├── pages/                # Standalone page components
│   └── shared/               # Reusable components and pipes
├── assets/
├── environments/
├── index.html
└── main.ts

📊 Key Features
Statistics dashboard

Visualization of car utilization and most rented vehicles

Upcoming scheduled services

Modular architecture based on Clean Architecture principles

Soft styling with TailwindCSS

Charts using ng2-charts

🛠️ Production build
ng build --configuration production
Files will be generated in the dist/ folder.

🤝 Contributions
Pull Requests are welcome. For major changes, please open an issue first to discuss what you would like to modify.
Please make sure to update tests as appropriate.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👤 Author
Pablo Podgaiz
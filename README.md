<h1 align="center">Customer Categorization System</h1>

<p align="center">
  <a href="https://github.com/DebaA17/dataspace-academy-summer-intern/actions/workflows/python-ci.yml">
    <img src="https://github.com/DebaA17/dataspace-academy-summer-intern/actions/workflows/python-ci.yml/badge.svg" alt="Python CI" />
  </a>
  <a href="https://github.com/DebaA17/dataspace-academy-summer-intern/actions/workflows/frontend-ci.yml">
    <img src="https://github.com/DebaA17/dataspace-academy-summer-intern/actions/workflows/frontend-ci.yml/badge.svg" alt="Frontend CI" />
  </a>
  <a href="https://github.com/DebaA17/dataspace-academy-summer-intern/actions/workflows/pr-validation.yml">
    <img src="https://github.com/DebaA17/dataspace-academy-summer-intern/actions/workflows/pr-validation.yml/badge.svg" alt="PR Validation" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  </a>
</p>

<p align="center">
  An AI/ML-powered customer segmentation and categorization platform developed during the DataSpace Internship.
</p>

---

## 🛠️ Technology Stack

* **Frontend**: React 19, React Router, Bootstrap, Recharts, pnpm
* **Backend**: Django 5.2, Django REST Framework, SQLite, CORS Headers
* **Machine Learning**: Python 3.11+, pandas, numpy, scikit-learn, XGBoost

---

## 🚀 Local Development Setup

### Prerequisites
* Python 3.11+
* Node.js (v24+ recommended)
* `pnpm` package manager

### 1. Backend Setup
1. Navigate to the project root.
2. Initialize and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and database setup:
   ```bash
   python backend/manage.py migrate
   ```
5. Start the development server (runs on port `8000`):
   ```bash
   DJANGO_DEBUG=True python backend/manage.py runserver
   ```

### 2. Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm start
   ```
   *The frontend will open automatically at [http://localhost:3000](http://localhost:3000).*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

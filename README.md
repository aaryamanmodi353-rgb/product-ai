# E-Commerce Price Predictor AI 🚀

A full-stack AI-powered web application that predicts the optimal listing price for e-commerce products based on their title, description, condition, and shipping details.

This project was built as an end-to-end Machine Learning pipeline utilizing the **Mercari Price Suggestion Challenge** dataset (1.4 million rows). 

##  Architecture

- **Machine Learning Model:** Scikit-Learn (TF-IDF Vectorization + Ridge Regression)
- **Backend API:** FastAPI (Python) serving the serialized `.joblib` model.
- **Frontend UI:** React + Vite + Tailwind CSS.

## 📊 Dataset & Modeling
The model is trained to handle unstructured text data. Instead of just numerical inputs, it uses Natural Language Processing (NLP) to extract meaningful features from raw product descriptions. 
The Jupyter Notebook (`ECommerce_Price_Predictor.ipynb`) includes:
- Data pre-processing and Train/Test splitting.
- A scikit-learn Pipeline incorporating a `ColumnTransformer` and a `Ridge` Regressor optimized for sparse matrices (`solver='sag'`).
- Detailed Evaluation: Regression metrics (MAE, RMSE, R²) and Classification metrics (Accuracy, Precision, Recall, F1) by categorizing prices into Budget, Mid-Range, and Premium brackets.

## 🚀 How to Run Locally

### 1. Start the FastAPI Backend
```bash
python server.py
# Or using uvicorn: uvicorn server:app --reload
```
*The backend API will run on http://localhost:8000*

### 2. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
*The React UI will run on http://localhost:5173*

## 💡 Usage
1. Open the frontend in your browser.
2. Enter a product name (e.g., "Nike Air Max 90") and a detailed description.
3. Click "Calculate Target Price". The frontend will send a POST request to the FastAPI backend, which runs the text through the TF-IDF vectorizer, makes a prediction using the Ridge model, and returns the estimated market value.

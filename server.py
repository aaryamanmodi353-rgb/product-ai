from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

app = FastAPI(title="E-Commerce Price Predictor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('mercari_price_model.joblib')

class ProductPredictionInput(BaseModel):
    name: str
    item_description: str
    item_condition_id: int
    shipping: int

@app.post("/predict")
def predict_price(data: ProductPredictionInput):
    combined_text = f"{data.name} {data.item_description}"
    input_df = pd.DataFrame([{
        'combined_text': combined_text,
        'item_condition_id': data.item_condition_id,
        'shipping': data.shipping
    }])
    
    log_prediction = model.predict(input_df)[0]
    final_price = float(np.expm1(log_prediction))
    return {"predicted_price": round(max(0.0, final_price), 2)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import py7zr
import pandas as pd
import os

print("Extracting train.tsv.7z...")
try:
    with py7zr.SevenZipFile('train.tsv.7z', mode='r') as z:
        z.extractall()
    print("Extraction complete.")
except Exception as e:
    print(f"Error extracting: {e}")

if os.path.exists('train.tsv'):
    print("Reading data...")
    df = pd.read_csv('train.tsv', sep='\t')
    
    print("=== DATASET OVERVIEW ===")
    print(f"Rows: {df.shape[0]}")
    print(f"Columns: {df.shape[1]}")
    
    print("\n=== COLUMNS INFO ===")
    print(df.info())
    
    print("\n=== MISSING VALUES ===")
    print(df.isnull().sum())
    
    print("\n=== SUMMARY STATISTICS ===")
    print(df.describe(include='all'))
    
    print("\n=== TOP 5 ROWS ===")
    print(df.head())
else:
    print("train.tsv not found after extraction.")

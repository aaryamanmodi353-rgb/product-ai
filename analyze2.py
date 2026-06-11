import py7zr
import pandas as pd
import os

with open('output_utf8.txt', 'w', encoding='utf-8') as f:
    f.write("=== DATASET OVERVIEW ===\n")
    if os.path.exists('train.tsv'):
        df = pd.read_csv('train.tsv', sep='\t')
        
        f.write(f"Rows: {df.shape[0]}\n")
        f.write(f"Columns: {df.shape[1]}\n")
        
        f.write("\n=== COLUMNS INFO ===\n")
        import io
        buffer = io.StringIO()
        df.info(buf=buffer)
        f.write(buffer.getvalue())
        
        f.write("\n=== MISSING VALUES ===\n")
        f.write(df.isnull().sum().to_string())
        f.write("\n")
        
        f.write("\n=== SUMMARY STATISTICS ===\n")
        f.write(df.describe(include='all').to_string())
        f.write("\n")
        
        f.write("\n=== TOP 5 ROWS ===\n")
        f.write(df.head().to_string())
        f.write("\n")
    else:
        f.write("train.tsv not found after extraction.\n")

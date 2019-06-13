import sqlite3
import pandas as pd

# load data
df = pd.read_csv('loving_WellData.csv')

# strip whitespace from headers
df.columns = df.columns.str.strip()

con = sqlite3.connect("lovingWells.db")

# drop data into database
df.to_sql("well_data", con)

con.close()
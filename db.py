import pandas ad pd
import pydodbc
import tradingeconomics as te
import os

te.login(API_KEY)

commodities = ['CO1:COM', 'hHG1:COM']
currencies = ['EURUSD:CUR', 'USDCAD:CUR']
indices = ['MID:IND']


conn_str = ('DRIVER={ODBC Driver 17 for SQL Server}; SERVER = localhost\SQLEXPRESS; DATABASE=MarketDataDB; Trusted_Connection=yes;')

cnxn = pyodbc.connect(conn_str)

cursor = cnxn.cursor()

indices_data = te.getMarketsBySymbol(symbols = indices)
indices_query = 'INSERT INTO Indices ()'

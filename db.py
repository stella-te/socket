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
indices_query = 'INSERT INTO Indices (Name, Symbol, Ticker, Price, Daily_Change, Percent_Change, Importance)
                    VALUES (?, ?, ?, ?, ?, ?, ?)'
for item in indices_data:
    cursor.execute(indices_query, item['Name'], item['Symbol'], item['Ticker'], item['Close'],
    item['DailyChange'], item['DailyPercentualChange'], item['Importance'])


# currencies_data = te.getMarketsBySymbol(symbols = currencies)

cnxn.commit()
curser.close()
cnxn.close()

# end

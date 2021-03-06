rm ./data/raw/tiingo/ticker_symbols.csv
rm ./data/raw/tiingo/supported_tickers.csv

wget https://apimedia.tiingo.com/docs/tiingo/daily/supported_tickers.zip
unzip supported_tickers.zip
rm supported_tickers.zip

# Awk Filters the tickers and gives us an output such as:
# Stockname:Market,Type,Denomination,YYYY-MM-DD,YYYY-MM-DD    
# Where Type is Stock/ETF/etc.,     Start       End

awk  -f ./scripts/filter_ticker_symbols.awk supported_tickers.csv > ticker_symbols.csv

mv ticker_symbols.csv data/raw/tiingo/
rm supported_tickers.csv

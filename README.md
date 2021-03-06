# maplog
Trading &amp; Mapped Log / Logic Program in Logtalk (SWI Prolog) with Node.js crawling & serving an http+html client running WebGL.

*Client*
Requests & Inputs Facts to a [Pengine](https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/pengines.html%27)) Server 

### TODO

- [x] ticker_symbol Protocol:   directory_location/1, exchange/1, denomination/1, asset_type/1, name/1
- [ ] [Save Object Facts as Data Protocols to Folder](https://github.com/LogtalkDotOrg/logtalk3/tree/ca394b5da94462c882007261115fd365a5d873c9/examples/serialization)
- [ ] Implement Pengines: [Logtalk Style](https://github.com/LogtalkDotOrg/logtalk3/tree/master/examples/pengines)


## Data Sources

### Ontologies

- [FIBO Financial Ontology](https://github.com/edmcouncil/fibo)
        - This is a GIT Submodule; you'll have to initialize it.

### Financial Data

- [x] Tiingo
- -[ ] Edgar
        
        - These feeds are updated every ten minutes Monday through Friday, 6am – 10pm EST.
        - cron(10 * * * 1,2,3,4,5)

[] Quandl

Max Requests Per Hour 20,000
Max Requests Per Day  150,000

## Rates & Triggers

- [ ] Rate-Limiting Queue [logtalk queue module](https://logtalk.org/docs/queuep_0.html)
- [ ] 

- [x] User triggers a selective scrape.
- [x] Runs the scraper once daily.
- [x] cron jobs stored in /etc/crontab.

## Storage

Files are stored in:

 `/data/<exchange>/<ticker_symbol>/<klines, trades, orders, filings>`

## Representation

Time is always represented in ISO-8601 format ...
> 19790201T220000PT1MZ --> Time period of February 1st, 1979 at 10:00 — until 1 minutes' time later, UTC

## File API

### *K-lines (Candlesticks) 
Time, Open, High, Low, Close, Volume

### Trades
Time, Price, Quantity, Buy/Sell, ID, Buyer_is_Maker, Trade_is_Best_Price_Match


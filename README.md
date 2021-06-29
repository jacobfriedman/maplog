# maplog
Trading &amp; Mapped Log / Logic Program in Logtalk (SWI Prolog) with Node.js crawling & serving an http+html client running WebGL.

## Data Sources

[x] Tiingo
[] Quandl

## Rates & Triggers

[x] User triggers a selective scrape.
[x] Runs the scraper once daily.
[x] cron jobs stored in /etc/crontab.

## Storage

Files are stored in:

 `/data/raw/<ticker>/<klines, trades, orders, or books>`

## Representation

Time is always represented in ISO-8601 format ...

> 19790201T220000PT1MZ --> Time period of February 1st, 1979 at 10:00 — until 1 minutes' time later, UTC

## File API

### *K-lines (Candlesticks) 
Time, Open, High, Low, Close, Volume

### Trades
Time, Price, Quantity, Buy/Sell, ID, Buyer_is_Maker, Trade_is_Best_Price_Match


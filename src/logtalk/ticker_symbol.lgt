:- protocol(ticker_symbol).

:- dynamic.
:- public([
    data_location/1,
    exchange/1,
    denomination/1,
    asset_type/1,
    ticker_symbol/1
]).

:- end_protocol.

:- protocol(ticker_symbol).

:- dynamic.
:- public([
    data_locations/1,
    exchanges/1,
    denomination/1,
    asset_type/1
]).

:- end_protocol.

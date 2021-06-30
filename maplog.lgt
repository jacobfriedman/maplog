:- use_module(library(csv)).

:- object(maplog).

	% Handle the CSV Library Meta Predicate
	:- use_module(library(csv), [csv_read_file/2]).
	:- meta_predicate(csv:csv_read_file(*)).

	:- public( [build_directory_structure/1] ).   

	:- uses(user, [ticker_symbol/1, market/1, denomination/2, asset_type/2]).   

	:- initialization(run).
	:- dynamic(user::ticker_symbol/1).
	:- dynamic(user::market/1).
	:- dynamic(user::denomination/2).
	:- dynamic(user::asset_type/2).

% The Initial Maplog Boot.
run :-

	os::make_directory('data'),
	write('Procuring ticker symbol directories ... '),
	build_directory_structure(ticker_symbols).

parse_tiingo_ticker_rows([]) :- true.
parse_tiingo_ticker_rows([Row | Rows]) :- 

		% Data Coming from Tiingo looks like: `ZNCM,PINK,Stock,USD,1995-02-01,2021-06-28`
		Row = row(Ticker, Market, Asset_Type, Denomination, Start_Date, End_Date),

		% Build the Sub-Directory

		% atomic_list_concat(['raw','/',Market,'/',Ticker], Processed_Ticker_Directory),

		atomic_list_concat(['exchanges','/',Market,'/',Ticker], Processed_Ticker_Directory),
	    os::ensure_directory(Processed_Ticker_Directory),

		% Do Work...
		asserta(ticker_symbol(Ticker)),
		asserta(market(Market)),
		asserta(market(Market)),
		asserta(denomination(Ticker, Denomination)),
	    asserta(asset_type(Ticker, Asset_Type)),

		% Load the Ticker into
		atomic_list_concat([Market, '_', Ticker], Ticker_Symbol_Identifier), 

		(	current_object(Ticker_Symbol_Identifier) 
		->	!
		;	create_object(
				Ticker_Symbol_Identifier,
				[implements(ticker_symbol)],
				[],
				[
						data_locations(Processed_Ticker_Directory)
				]
			)
		),

		parse_tiingo_ticker_rows(Rows).

build_directory_structure(ticker_symbols) :-

	csv_read_file('./data/raw/tiingo/ticker_symbols.csv', Result),
	os::change_directory('./data'),
	parse_tiingo_ticker_rows(Result),
	length(Result, Length),
	write(Length), write(' tickers procured.'),
	writeln(' ').

:- end_object.
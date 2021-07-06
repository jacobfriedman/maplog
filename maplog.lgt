:- use_module(library(csv)).
:- use_module(library(http/http_client)).
:- use_module(library(strings)).

:- object(maplog).

	% Handle the CSV Library Meta Predicate
	:- use_module(library(csv), [csv_read_file/2]).
	:- meta_predicate(csv:csv_read_file(*)).

	:- public( [build_directory_structure/1, ticker_symbol/2] ).   

	:- dynamic(ticker_symbol/2).

	:- initialization(run).


ticker_symbol_cik_assertion([]) :- true.
ticker_symbol_cik_assertion([row(Ticker_Symbol, Central_Index_Key) | Rest]) :-
	% ::assertz(central_index_key(Ticker_Symbol, Central_Index_Key)),
	::assertz(ticker_symbol(Central_Index_Key, Ticker_Symbol)),
	ticker_symbol_cik_assertion(Rest).

get_sec_ticker_symbols_and_central_index_keys(Ticker_Symbols_And_Central_Index_Keys) :- 
	http:http_get('https://www.sec.gov/include/ticker.txt',Data, []),
	open_string(Data,Stream),
	csv:csv_read_stream(Stream, Rows, [separator(9)]),
	ticker_symbol_cik_assertion(Rows).

% The Initial Maplog Boot.
run :-

	os::make_directory('data'),
	get_sec_ticker_symbols_and_central_index_keys(Central_Index_Keys),
	writeln('Procuring ticker symbol directories ... '),
	os::ensure_directory('data/exchanges').
	% build_directory_structure(ticker_symbols).

parse_tiingo_ticker_rows([]) :- true.
parse_tiingo_ticker_rows([Row | Rows]) :- 

		os::working_directory(Current_Working_Directory),
		% Data Coming from Tiingo looks like: `ZNCM,PINK,Stock,USD,1995-02-01,2021-06-28`
		Row = row(Ticker_Symbol, Market, Asset_Type, Denomination, Start_Date, End_Date),

		% Build the Sub-Directory
		atomic_list_concat(['./data/exchanges/',Market,'/',Ticker_Symbol], Ticker_Symbol_Directory),
	    os::ensure_directory(Ticker_Symbol_Directory),

		% Build ticker_symbol objects
		% ID is <Market + '_' + Ticker_Symbol>
		atomic_list_concat([Market, '_', Ticker_Symbol], Ticker_Symbol_Identifier),
		string_lower(Ticker_Symbol_Identifier, Ticker_Symbol_Identifier_Lowercase),
		write(Ticker_Symbol_Identifier_Lowercase), write(' '),
		% Create an Atomic Object from String
		atom_string(Ticker_Symbol_Object, Ticker_Symbol_Identifier_Lowercase),

		/*(	current_object(Ticker_Symbol_Object) 
		->	!

		% 	There should be some way of quickly defining this data-structure quickly.
		%	Perhaps this is it? 
		;	create_object(
			Ticker_Symbol_Object,
				[implements(ticker_symbol)],
				[
					public([
						directory_location/1,
						exchange/1,
						denomination/1,
						asset_type/1,
						ticker_symbol/1]
					)],
				[
						directory_location(Ticker_Symbol_Directory),
						exchange(Market),
						denomination(Denomination),
						asset_type(Asset_Type),
						ticker_symbol(Ticker_Symbol)
				]
			)
		),
		*/

		% 	Does the object declare certain facts? 
		% 	Should it be transformed/resampled in any way?
		% 	Protocols manage how things are transmitted/stored

		% TODO

		% -- Serialize & Store the Logtalk Ticker Object -- 
		%	
		% 	Remember: A protocol is a set of rules for formatting and processing data.

		% 			- downloaded / clean Data -> store as text. HOW to store it, not WHY OR WHAT TO STORE.
		% 			- ticker_data stores information about the ticker + links to the company info...?

		% 		... Store the data, include the source! 
		% 		... if there's no source, assume asserted from self, from a process... which used certain data.

		% 	https://logtalk.org/manuals/tutorial/attributes.html

		% object_property(nyse_a,X). 
		% Perhaps define more properties on the object

		% Define an interface to export ONLY data from TIINGO (or from any source).
		% Ensure that the data is consistent with another source, raise a flag if not.

		% Part of this 'cleaner' stores the serialized data in-memory as "persistent"
		% And another stores it as a backup fact library in-file.


		atom_concat(Ticker_Symbol,'.lgt', Ticker_Symbol_Filename),

		% File the Object
		os::change_directory(Ticker_Symbol_Directory),
		os::ensure_file(Ticker_Symbol_Filename),
		open(Ticker_Symbol_Filename, write, Stream),
		write_canonical(Stream, object(Ticker_Symbol_Identifier_Lowercase)), write(Stream, '.\n'),
		close(Stream),
		% serializer::save(Ticker_Symbol_Identifier, Ticker_Symbol),
		os::change_directory(Current_Working_Directory),
	
	 parse_tiingo_ticker_rows(Rows).
		


build_directory_structure(ticker_symbols) :-
	csv_read_file('./data/raw/tiingo/ticker_symbols.csv', Result),
	parse_tiingo_ticker_rows(Result),
	length(Result, Length),
	write(Length), write(' tickers procured.'),
	writeln(' ').

:- end_object.
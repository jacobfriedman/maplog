:- object(parse).

	% the initialization/1 directive argument is automatically executed
	% when the object is loaded into memory:
	% 
	% Parse the CSV File
	% csv::read_file('supported_tickers.csv', Output),
	% os::shell('rm supported_tickers.csv'),


/*
types::character::is_end_of_line(Character)
reader:

parse_stream(Stream_Position, Token, Stream-Pos1) :-
        seek(Stream, Pos0),
        read_string(Stream, " ", "", _, TokenString),
        atom_string(Token, TokenString),
        at(Stream, Pos1).
*/
/*
 sentence --> noun, [is], adjective.
 noun --> [prolog] ; [lisp].
 adjective --> [boring] ; [great].
*/

% read_character(Character, Characters) :- []

%	file(File) :-
%		open(File, read, ID),  				% open a stream
%		reader::stream_to_chars(ID,Codes),
%		write(Codes),
%		stream_property(ID),
%		close(ID).          				% close the file


:- end_object.
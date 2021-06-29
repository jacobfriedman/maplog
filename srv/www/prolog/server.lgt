%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%  
%  Localhost UDP Socket Listener
%
%  Created by Jacob Friedman on 2021-02-17.
%
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/*
:- initialization(create_socket).

create_socket :- socket('AF_INET', Internet_Socket),

    write('Host Information:'),
    hostname_address('localhost', Host_Address),
    write('\n'),

     socket_bind(Internet_Socket,'AF_INET'(Host_Address, 10002)),

    write('Host Address:'),
    write(Host_Address),
    write('\n'),

    socket_connect(Internet_Socket, 'AF_INET'('127.0.0.1', 10000), StreamIn, StreamOut),

    set_input(StreamIn),
    set_output(StreamOut).
*/
% socket_accept(Socket, Localhost_Address, StreamIn, StreamOut),
% writeln(StreamIn), 
% writeln(StreamOut).

server :-
    catch( 
        accept_connection( 10000, Socket, Stream_Input, Stream_Output ),
        X, fail_message( X, Socket ) 
    ),
    set_stream_type(Stream_Input, binary ),
    catch( 
        ingest_chunks( Stream_Input ),
        E, fail_message( E, Socket ) 
    ),
    close_connection( Socket, Stream_Input, Stream_Output ).
    
accept_connection( Port, Socket, Stream_Input, Stream_Output ) :-
    socket('AF_INET', Socket ),
    socket_bind( Socket, 'AF_INET'( Hostname, Port ) ),
    format( "~w : ~w ~n", ['Hostname', Hostname ] ),
    socket_listen( Socket, 1 ),
    socket_accept( Socket, Stream_Input, Stream_Output ).

% 4-byte Length 

ingest_chunks(Stream) :- 
    nl,
    print('Ingesting Chunks'),
    %% Declare length of incoming ByteArray
    get_byte(Stream, B1),
    get_byte(Stream, B2),
    get_byte(Stream, B3),
    get_byte(Stream, B4),
    % print([0x1a,B1,B2,B3,B4]),
    cbor::parse([0x1a,B1,B2,B3,B4], Length),
    print('Length of Bytes is: '),
    print(Length),
    print('\n'),
    Position is 0,
    Bytes = [],
    get_bytes(Stream, Length, Position, Bytes), 
    !.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Modification of Paolo Moura's Bytecode Reader
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

evaluate(LastByte, Bytes) :- 
    print('Evaluating Bytes:'),
    print('\n'),
    reverse([LastByte | Bytes], CBOR),
    print(CBOR),
    cbor::parse(CBOR, Output),
    print('\n'),
    print(Output),
    print('\n').

get_bytes(Stream, Length, Position, Bytes) :- 
    get_byte(Stream, Byte),
    Position_Incremented is Position + 1,
    (
        Position_Incremented =:= Length ->
            evaluate(Byte, Bytes), !,
            ingest_chunks(Stream)
        ;
        get_bytes(Stream, Length, Position_Incremented, [Byte | Bytes])   
    ).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



















format_prompt( O ) :-
format( O, "~w ", [ '?-'] ),
flush_output( O ).

close_connection( N, I, O ) :-
close( I ),
close( O ),
socket_close( N ).

fail_message( X, N ) :-
format( "fail : ~w ~n", [X] ),
socket_close( N ),
fail.

quit_connection( 'exit' ) :- !.
quit_connection( 'halt' ) :- !.
quit_connection( 'quit' ) :- !.
:- object(filter).

	:- public(run/0).

	:- initialization(run).

run :-
	write('loaded Filter').

:- end_object.
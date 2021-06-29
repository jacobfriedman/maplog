:- object(list).

    :- public([
        append/3, length/2, member/2
    ]).

    append([], List, List).
    append([Head| Tail], List, [Head| Tail2]) :-
        append(Tail, List, Tail2).

    length(List, Length) :-
        length(List, 0, Length).

    length([], Length, Length).
    length([_| Tail], Acc, Length) :-
        Acc2 is Acc + 1,
        length(Tail, Acc2, Length).

    member(Element, [Element| _]).
    member(Element, [_| List]) :-
        member(Element, List).

:- end_object.
:- category(attributes).

    :- public(set_attribute/2).
    :- mode(set_attribute(+nonvar, +nonvar), one).

    :- public(get_attribute/2).
    :- mode(get_attribute(?nonvar, ?nonvar), zero_or_more).

    :- public(del_attribute/2).
    :- mode(del_attribute(?nonvar, ?nonvar), zero_or_more).

    :- public(del_attributes/2).
    :- mode(del_attributes(@term, @term), one).

    :- private(attribute_/2).
    :- mode(attribute_(?nonvar, ?nonvar), zero_or_more).
    :- dynamic(attribute_/2).

    set_attribute(Attribute, Value):-
        ::retractall(attribute_(Attribute, _)),
        ::assertz(attribute_(Attribute, Value)).

    get_attribute(Attribute, Value):-
        ::attribute_(Attribute, Value).

    del_attribute(Attribute, Value):-
        ::retract(attribute_(Attribute, Value)).

    del_attributes(Attribute, Value):-
        ::retractall(attribute_(Attribute, Value)).

:- end_category.
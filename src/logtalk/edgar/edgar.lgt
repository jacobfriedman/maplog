:- use_module(library(http)).


:- object(edgar).

    :- info([
        version is 1:0:0,
        author is 'Jacob Friedman',
        date is 2021-07-07,
        comment is 'Pull and Synchronize EDGAR documents from the SEC.'
    ]).

    :- public([
        synchronize/2
    ]).



%   A List of daily Filings are at https://www.sec.gov/Archives/edgar/monthly/
%   - Monthly filings monthly/xbrlrss-2005-04.xml


get_documents_filed_on(Date) :- true.

get_documents_filed(Start_Date,End_Date) :- true.


:- end_object.



/*


pull(Date) :-

http_open('https://www.sec.gov/Archives/edgar/monthly/', In, []),


rss(Xml) :- 


parse(Date) :- 





:- info([
    version is 1:0:0,
    author is 'Paulo Moura',
    date is 2018-12-19,
    comment is 'Simple example of serialization of dynamic objects.'
]).

:- public(save/2).
:- mode(save(+protocol_identifier, +atom), zero_or_one).
:- info(save/2, [
    comment is 'Serializes to a file all dynamic objects implementing a given protocol. Fails if the protocol is not defined.',
    argnames is ['Protocol', 'File']
]).

:- public([restore/1, object_data/4, save_object/3]).
:- mode(restore(+atom), one).
:- info(restore/1, [
    comment is 'Restores from a file all serialized dynamic objects.',
    argnames is ['File']
]).

*/
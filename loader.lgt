% HTTP and JSON libraries
:- use_module(library(http/http_open)).

:- initialization(
	logtalk_load([
			os(loader),
			csv(loader),
			reader(loader),
			dynpred(loader),
			
			'./src/logtalk/utilities/date_arithmetic.lgt',
			'./src/logtalk/utilities/serializer.lgt',
			'./src/logtalk/utilities/attributes.lgt',
			'./src/logtalk/ticker_symbol.lgt',
			'filter/loader.lgt',
			maplog
		])
	).
	
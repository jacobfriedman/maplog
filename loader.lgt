:- initialization(
	logtalk_load([
			os(loader),
			csv(loader),
			reader(loader),
			dynpred(loader),
			'./src/logtalk/utilities/date_arithmetic.lgt',
			'./src/logtalk/utilities/serializer.lgt',
			'./src/logtalk/ticker_symbol.lgt',
			'parse/loader.lgt',
			'filter/loader.lgt',
			maplog
		])
	).
	
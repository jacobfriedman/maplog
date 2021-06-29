:- initialization(
	logtalk_load([
			os(loader),
			csv(loader),
			reader(loader),
			dynpred(loader),
			'utilities/date_arithmetic.lgt',
			'parse/loader.lgt',
			'filter/loader.lgt',
			maplog
		])
	).
	
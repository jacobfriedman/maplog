const Binance = require('node-binance-api')
const binance = new Binance();

global.ticker = {};

/*
// Show contents of BNBUSDT ticker object once per second
setInterval( () => {
    if ( !global.ticker.BNBUSDT ) return;
    console.log( global.ticker.BNBUSDT );
    console.log( `BNB ask: ${global.ticker.BNBUSDT.bestAsk} bid: ${global.ticker.BNBUSDT.bestBid}` );
}, 1000 );

// Get 24h price change statistics for all symbols
binance.websockets.prevDay( false, function ( error, obj ) {
    global.ticker[obj.symbol] = obj;
} );


binance.websockets.trades(['XLMUSDT'], (trades) => {
  let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
  console.info(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
});

binance.websockets.depthCache(['XLMUSDT'], (symbol, depth) => {
    let bids = binance.sortBids(depth.bids);
    let asks = binance.sortAsks(depth.asks);
    console.info(symbol+" depth cache update");
    console.info("bids", bids);
    console.info("asks", asks);
    console.info("best bid: "+binance.first(bids));
    console.info("best ask: "+binance.first(asks));
    console.info("last updated: " + new Date(depth.eventTime));
  });
  */
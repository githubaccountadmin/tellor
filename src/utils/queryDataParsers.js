import { psrLookup } from './psrLookup'
import Web3 from 'web3'

const eighteenDecimals = 1000000000000000000

const web3 = new Web3(window.ethereum)

export const queryDataParsers = {
  LegacyRequest: (event) => {
    switch (event.queryId) {
      case 1:
        event.decodedValueName = psrLookup[event.queryId].name
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(event._value / 1000000)
        return event
      case 2:
        event.decodedValueName = psrLookup[event.queryId].name
        try {event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(event._value / 1000000)
      } catch {
        event.decodedValue='disputed'
      }
        return event
      case 3:
        event.decodedValueName = psrLookup[event.queryId].name
        event.decodedValue =
          event._value === '0x'
            ? '0'
            : new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: 'USD',
              }).format(event._value / 1000000)
        return event
      case 10:
        event.decodedValueName = psrLookup[event.queryId].name
        event.decodedValue =
          event._value.toString().length > 17
            ? new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: 'USD',
              }).format(event._value / eighteenDecimals)
            : new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: 'USD',
              }).format(event._value / 1000000)
        return event
      case 41:
        event.decodedValueName = psrLookup[event.queryId].name
        event.decodedValue =
          event._value.toString().length > 18
            ? (event._value / eighteenDecimals).toString()
            : event._value.toString().length > 6
            ? '*' + (event._value / 1000000).toString()
            : '*' + event._value.toString()
        return event
      case 50:
        event.decodedValueName = psrLookup[event.queryId].name
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(event._value / 1000000)
        return event
      case 59:
        event.decodedValueName = psrLookup[event.queryId].name
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'JPY',
        }).format(event._value / 1000000)
        return event
      default:
        event.decodedValueName = 'New Legacy Type'
        event.decodedValue = '0'
        return event
    }
  },
  MimicryNFTMarketIndex: (event) => {
    event.decodedValueName = `MIMICRY NFT INDEX (${event.queryDataObj[0].slice(0,3).toUpperCase()})`

    const valueInWei = parseInt(event._value, 16) / 10 ** 18;
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(valueInWei);
    event.decodedValue = formattedValue;
    return event;
  },
  MimicryMacroMarketMashup: (event) => {
    event.decodedValueName = `MIMICRY NFT MASHUP (${event.queryDataObj[3][0][1].toUpperCase()})`
    const valueInWei = parseInt(event._value, 16) / 1;
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(valueInWei);
    event.decodedValue = formattedValue;
    return event;
  },
  MimicryCollectionStat : (event) => {
    event.decodedValueName = `MimicryCollectionStat ${event.queryDataObj[0].toUpperCase(),event.queryDataObj[1],event.queryDataObj[2]}`
    
    const valueInWei = parseInt(event._value, 16) / 10 ** 18;
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(valueInWei);
    event.decodedValue = formattedValue;
    return event;
  },
  
  EVMCall : (event) => {
    event.decodedValueName = `EVMCall`;
    event.decodedValue = `${event.queryDataObj[0]}`;
    return event;
  },
  
  SpotPrice: (event) => {
    switch (event.queryId) {

      case 5:
        event.decodedValueName = `${event.queryDataObj.asset}/${event.queryDataObj.currency}`
        event.decodedValue = parseInt(Number(event._value), 10)
        if (event.decodedValue % 1 === 0 || event.decodedValue.toFixed(2).slice(-2) === '00') {
          event.decodedValue = parseInt(event.decodedValue, 10);
        }
  
        return event
      default:
        event.decodedValueName = 'New SpotPrice Type'
        event.decodedValue = '0'
        return event
    }
  },
  SpotPriceProper: (event) => {
    switch (event.queryDataObj[0]) {
      case 'ohm':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = `${
          parseInt(Number(event._value), 10) / eighteenDecimals
        }`
        return event
      case 'dai':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = `$${(
          parseInt(Number(event._value), 10) / eighteenDecimals
        ).toString()}`
        return event
      case 'ric':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      case 'bct':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      case 'mkr':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(event._value) / eighteenDecimals)
        return event
      case 'usdc':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      case 'vsq':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      case 'idle':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      case 'sushi':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      /*case 'pepe':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
          const value = parseInt(Number(event._value), 10) / eighteenDecimals
          const options = {
            style: 'currency',
            currency: 'USD',
          }
            options.minimumFractionDigits = 6
            options.maximumFractionDigits = 6
            event.decodedValue = new Intl.NumberFormat('en-EN', options).format(value)
        return event*/
      case 'matic':
        event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
        event.decodedValue = new Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
        return event
      case 'eur':
          event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
          event.decodedValue = new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'USD',
          }).format(parseInt(Number(event._value), 10) / eighteenDecimals)
          return event
      case 'steth':
        if (event.queryDataObj[1] === 'btc') {
          event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
          const value = parseInt(Number(event._value), 10) / eighteenDecimals
          const options = {
            style: 'currency',
            currency: 'BTC',
          }
            options.minimumFractionDigits = 6
            options.maximumFractionDigits = 6
            event.decodedValue = new Intl.NumberFormat('en-EN', options).format(value)

          }
      if (event.queryDataObj[1] === 'usd') {
          let queryData = web3.eth.abi.decodeParameters(['string', 'string'], web3.eth.abi.decodeParameters(['string', 'bytes'], event._queryData)[1])
          event.decodedValueName = `${queryData[0].toUpperCase()}/${queryData[1].toUpperCase()}`
          event.decodedValue = new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: queryData[1].toUpperCase(),
          }).format(Number(event._value) / eighteenDecimals)
      }
            return event
      case 'wsteth':
        if (event.queryDataObj[1] === 'eth') {
            event.decodedValueName = `${event.queryDataObj[0].toUpperCase()}/${event.queryDataObj[1].toUpperCase()}`
            const value = parseInt(Number(event._value), 10) / eighteenDecimals
            const options = {
              style: 'currency',
              currency: 'ETH',
            }
              options.minimumFractionDigits = 6
              options.maximumFractionDigits = 6
              event.decodedValue = new Intl.NumberFormat('en-EN', options).format(value)

            }
        if (event.queryDataObj[1] === 'usd') {
            let queryData = web3.eth.abi.decodeParameters(['string', 'string'], web3.eth.abi.decodeParameters(['string', 'bytes'], event._queryData)[1])
            event.decodedValueName = `${queryData[0].toUpperCase()}/${queryData[1].toUpperCase()}`
            event.decodedValue = new Intl.NumberFormat('en-EN', {
              style: 'currency',
              currency: queryData[1].toUpperCase(),
            }).format(Number(event._value) / eighteenDecimals)
        }
        return event

          
        default:
          let queryData = web3.eth.abi.decodeParameters(['string', 'string'], web3.eth.abi.decodeParameters(['string', 'bytes'], event._queryData)[1]);
          event.decodedValueName = `${queryData[0].toUpperCase()}/${queryData[1].toUpperCase()}`;
          let value = Number(event._value) / eighteenDecimals;
        
          // Format the number with 7 decimals if it includes '.00', otherwise use Intl.NumberFormat with currency style
          if (value.toFixed(2).includes('.00')) {
            let currencySymbol = new Intl.NumberFormat('en-EN', {
              style: 'currency',
              currency: queryData[1].toUpperCase(),
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).formatToParts(0).find(part => part.type === 'currency').value;
        
            event.decodedValue = value.toFixed(18);
            if (/\.0+$/.test(event.decodedValue)) {
              event.decodedValue = event.decodedValue.replace(/\.0+$/, '');
            }
            event.decodedValue = currencySymbol  + event.decodedValue;
          } else {
            event.decodedValue = new Intl.NumberFormat('en-EN', {
              style: 'currency',
              currency: queryData[1].toUpperCase(),
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(value);
          }
        
          return event;
        
  }
  },
  // Snapshot: (event) => {
  //   switch (event) {
  //     case '1':
  //       event.decodedValueName = `SPID: ${event.snapshotProposalId}`
  //       event.decodedValue = `[${event.tempValues[0]}, ${event.tempValues[1]}]`
  //       return event
  //     default:
  //       event.decodedValueName = 'New Snapshot Type'
  //       event.decodedValue = '0'
  //       return event
  //   }
  // },*/
  Default: (event) => {
    switch (event._value.length) {
      case 66:
        event.decodedValueName = web3.eth.abi.decodeParameters(['string', 'bytes'], event._queryData)[0]
        event.decodedValue =  parseInt(event._value)/eighteenDecimals
        return event
      default:
        event.decodedValueName = web3.eth.abi.decodeParameters(['string', 'bytes'], event._queryData)[0]
        event.decodedValue = '0'
        return event
    }
  },
}

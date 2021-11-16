import { useEffect, useState } from 'react'
import { stockService } from '../services/stockService'
import { StockPreview } from '../cmp/StockPreview'
import { serviceStorage } from '../services/storageService'
import loading from '../assets/img/loading.svg'

export const Home = () => {
  const [stockData, setstockData] = useState([])
  const [filterBy, setfilterBy] = useState()

  useEffect(() => {
    if (!filterBy) {
      const stocksFromStorage = serviceStorage.loadFromStorage('stockData')
      setstockData(stocksFromStorage)
    }
  }, [filterBy])

  const onChangeInput = async ({ target }) => {
    const filterBy = target.value
    const stocks = await stockService.getStocksData(filterBy)
    setstockData(stocks)
  }
  const onShowKey = key => {
    console.log(key)
    alert(key)
  }

  const changeInput = debounce(onChangeInput)

  function debounce (func, timeout = 300) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  if (!stockData)
    return (
      <div>
        <img src={loading} alt='loading' />
      </div>
    )
  return (
    <div className='main-container flex column'>
      <div className='stock-input'>
        <input
          type='text'
          value={filterBy}
          id='label'
          onChange={changeInput}
          placeholder='Search'
        />
      </div>
      <div className='stocks-list grid'>
        {stockData.map((stock, idx) => (
          <StockPreview
            stock={stock}
            key={stock.uid}
            idx={idx}
            onShowKey={onShowKey}
          />
        ))}
      </div>
    </div>
  )
}

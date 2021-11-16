export const StockPreview = ({ stock, idx, onShowKey }) => {
  const onUid = ev => {
    ev.stopPropagation()
    alert(stock.uid)
  }
  return (
    <div className='stock-preview pointer' onClick={() => onShowKey(idx + 1)}>
      <p>
        <span>Label:</span>
        {stock.label}
      </p>
      <p>
        <span> Ticker:</span> {stock.ticker}
      </p>
      <p>
        <span> Category:</span> {stock.category}
      </p>
      <p>
        <span> Value: </span>
        {stock.value}
      </p>
      <p onClick={onUid}>
        <span>Uid: </span>
        {stock.uid}
      </p>
    </div>
  )
}

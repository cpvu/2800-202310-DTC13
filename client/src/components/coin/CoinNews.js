export default function CoinNews({ news }) {
    return (
        <>
           {news ? news.map((newsItem) => (
            <p>{newsItem.title}</p>
          )) : <></>}
        </>
    )
}
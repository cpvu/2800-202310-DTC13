export default function CoinNews({ news }) {
    return (
        <>
           {news ? news.map((newsItem, index) => (
            <p key={index}>{newsItem.title}</p>
          )) : <></>}
        </>
    )
}
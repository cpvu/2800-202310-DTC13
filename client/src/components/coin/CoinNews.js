export default function CoinNews({ news }) {
    return (
        <>
           {news ? news.map((newsItem) => (
            <p key={newsItem.title}>{newsItem.title}</p>
          )) : <></>}
        </>
    )
}
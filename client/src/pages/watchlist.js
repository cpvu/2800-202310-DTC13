import fetchWatchlist from "@/components/watchlist/services/fetchWatchlist";
import { useState } from "react";
import { useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState(false);

    useEffect(() => {
        fetchWatchlist()
            .then(response => setWatchlist(response.collection))
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <TableContainer>
                <Table align={"center"} minW={"60%"} maxW={"60%"} my={"auto"}>
                    <Thead>
                        <Tr>
                            {["Name", "Symbol", "Price", "Average Price"].map(heading => {
                                return (<Th>{heading}</Th>)
                            })}

                        </Tr>
                    </Thead>
                    <Tbody>

                        {watchlist ? watchlist.map(coin => {
                            return (<Tr>
                                <Td>{coin.name}</Td>
                                <Td>{coin.symbol}</Td>
                                <Td>{coin.amount}</Td>
                                <Td>{coin.averagePrice}</Td>
                            </Tr>)
                        }) : <p>No coins yet!</p>}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

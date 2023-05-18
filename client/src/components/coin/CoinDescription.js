import React, { useEffect, useState } from "react";

export default function CoinDescription() {
  //const [description, setDescription] = useState("");
  const description = "Ethereum is a decentralized, open-source blockchain platform that enables the creation and execution of smart contracts. It was proposed in late 2013 by Vitalik Buterin and went live on July 30, 2015. Ethereum's native cryptocurrency is called Ether (ETH), which is used to pay for transaction fees and computational services on the network. Ethereum's blockchain technology has revolutionized various industries, including finance, supply chain, gaming, and decentralized applications (DApps). It provides developers with a powerful platform to build and deploy decentralized applications and smart contracts, offering transparency, immutability, and programmability.";
  useEffect(() => {
    // Simulating an API call to fetch the description
    // Replace this with your actual API call to retrieve the description of Ethereum
    const fetchDescription = async () => {
      try {
        const response = await fetch("https://api.example.com/ethereum/description");
        const data = await response.json();
        setDescription(data.description);
      } catch (error) {
        console.log("Error fetching Ethereum description:", error);
      }
    };

    fetchDescription();
  }, []);

  return (
    <div>
      <h2>Ethereum Description</h2>
      <p>{description}</p>
    </div>
  );
};

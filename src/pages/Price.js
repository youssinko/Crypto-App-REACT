import {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
export default function Price (props) {
    //our API key from coinapi.io
    const apiKey="F496B7DA-0B11-496D-92FF-B88A574BF440"

    //grabbing the currency symbol from the Url Params
    //deconstruct symbol attribute 
    const { symbol } = useParams()

    // Using the other two variables to create our URL
    const url= `http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;
   //state to hold the coin data
  const [coin, setCoin] = useState("null");
  const [refresh, setRefresh] = useState(false)

   //function to fetch coin data
 

  const getCoin = async () => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
      // console.log(data.rate)
    } catch(e){
      console.error(e)
    }
  };


// useEffect to run getCoin when component mounts
useEffect(() => {
  getCoin();
}, [refresh]);
//
const handleClick= ()=>{
    setRefresh(!refresh)
}
// loaded function for when data is fetched
const loaded = () => {
  return (
    <div>
      <h1>
        {coin.asset_id_base}/{coin.asset_id_quote}
      </h1>
      <h2>{coin.rate}</h2>
      <br />
      <button onClick={handleClick}>refresh</button>
    </div>
  );
};

// Function for when data doesn't exist
const loading = () => {
  return <h1>Loading...</h1>;
};

// if coin has data, run the loaded function, otherwise, run loading
return coin && coin.rate ? loaded() : loading();
};
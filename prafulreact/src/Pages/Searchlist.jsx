import React, {useEffect, useState} from "react";
import axios from "axios";
import "../Styles/Content.css";
import SearchTab from "../Components/SearchTab";
import { useParams } from "react-router-dom";
import {API_ROOT,webPath} from "../apiConfig";
import {Helmet} from "react-helmet"

const Searchlist = () => {
  const {  searchVal } = useParams();

  const [advertisementData, setAdvertisementData] = useState([]);

  useEffect(() => {
    const fetchAdvertisementData = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/api/advertisement/get_active`);
        setAdvertisementData(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching advertisement data:', error);
      }
    };
  
    fetchAdvertisementData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts
  
  const canonicalUrl = `https://enterprisetalk.com/${searchVal}`

  return (
    <div>

<Helmet>
      <title>You searched for {searchVal} - Enterprise Talk</title>
	<meta name="description" content="A Peer Knowledge Resource Expert inputs on challenges, triumphs &amp; innovative solutions from corporate Movers &amp; Shakers in global Leadership." />
	<link rel="canonical" href={canonicalUrl} />
      </Helmet> 


      <div className="container container-max">
        <div className="row">

            
          <div className="col-md-12">
            <h1 className="fw-bold py-1 mt-3">Search Result : {searchVal}</h1>
          </div>
          <div className="hr"></div>
          </div>
          <SearchTab />

          <div className="container container-max ">
        <div className="row mt-5 spaceincontentbottm">
          <div className="col-md-12 mb-2 borderB">
            <div >
            {advertisementData && advertisementData.length > 0 && (
             <a href={`${advertisementData[2].dest_url}`}> <img
                style={{ width: "100%" }}
                src={`${webPath}${advertisementData[2].banner_img}`}
                alt={advertisementData[2].banner_name}
              /> </a>
            )}
            </div>
          </div>
        </div>
      </div>


       

        
      </div>
    </div>
  );
};

export default Searchlist;

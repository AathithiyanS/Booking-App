import React from 'react';
import "./propertyList.css";
import useFetch from '../../hooks/useFetch.js';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
    const { data, loading } = useFetch("/hotels/countByType");
    const navigate = useNavigate();

    return (
        <div className='pList'>
           {loading ? "loading..." : (
           <>
            <div className="pListItem" onClick={() => navigate("/properties/hotels", { state: { type: "hotel",dates: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ] } })}>
                <img src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" alt="" className="pListImg" />
                <div className="pListTitles">
                    <h1>Hotels</h1>
                    <h2>{data[0]} Hotels</h2>
                </div>
            </div>

            <div className="pListItem" onClick={() => navigate("/properties/apartments", { state: { type: "apartment" } })}>
                <img
                    src="https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA="
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <h1>Apartments</h1>
                    <h2>{data[1]} Apartments</h2>
                </div>
            </div>

            <div className="pListItem" onClick={() => navigate("/properties/resorts", { state: { type: "resort" } })}>
                <img
                    src="https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2022/04/b611b-resorts-near-coimbatore.jpg?fit=1000%2C667&ssl=1"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <h1>Resorts</h1>
                    <h2>{data[2]} Resorts</h2>
                </div>
            </div>

            <div className="pListItem" onClick={() => navigate("/properties/villas", { state: { type: "villa" } })}>
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <h1>Villas</h1>
                    <h2>{data[3]} Villas</h2>
                </div>
            </div>

            <div className="pListItem" onClick={() => navigate("/properties/cabins", { state: { type: "cabin" } })}>
                <img
                    src="https://static.wixstatic.com/media/3ffa1d_35ac4f6b1fa245858e61e527bbc011b0~mv2.jpg/v1/fill/w_1199,h_800,al_c/3ffa1d_35ac4f6b1fa245858e61e527bbc011b0~mv2.jpg"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <h1>Cabins</h1>
                    <h2>{data[4]} Cabins</h2>
                </div>
            </div>
            </>
           )}
        </div>
    );
};

export default PropertyList;

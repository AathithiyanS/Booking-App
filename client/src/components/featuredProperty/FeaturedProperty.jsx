import React from 'react';
import "./featuredProperty.css"
import useFetch from "../../hooks/useFetch.js";
const FeaturedProperty = () => {
    const { data, loading } = useFetch("/hotels?featured=true");
    
    return (
        
        <div className='fp'>
            {loading ? 
            "loading..." 
            : <>
                {data.map((item) => (

                    <div className="fpItem">
                        <img src={item.photos[0]} alt="" className="fpImg" />
                        <span className="fpName">{item.name}</span>
                        <span className="fpCity">{item.city}</span>
                        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                        {item.rating &&
                            <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>
                        }
                    </div>
                ))
                }
            </>}

        </div>
    );
};

export default FeaturedProperty;
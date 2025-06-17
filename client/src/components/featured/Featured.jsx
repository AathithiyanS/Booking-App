import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=new york,london,dubai"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait..."
      ) : (
        <>
          {" "}
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>New York</h1>
              <h2>{data[0]} Properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cms.inspirato.com/ImageGen.ashx?image=%2Fmedia%2F5682412%2FLondon_Dest_125855814.jpg&width=1081.5"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[1]} Properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/id/469692894/photo/dubai-sky-line-with-traffic-junction-and-burj-khalifa.jpg?s=1024x1024&w=is&k=20&c=3ycwCK4n1P-ud_tk6nb--n65gJK5NBg8TakLQ76YtTs="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Dubai</h1>
              <h2>{data[2]} Properties</h2>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Featured;

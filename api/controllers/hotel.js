import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {

  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true });
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {

  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getHotel = async (req, res, next) => {

  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
}
export const getHotels = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;

    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: Number(min) || 1, $lt: Number(max) || 999 },
    }).limit(Number(req.query.limit));

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const getCountByCity = async (req, res, next) => {

  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({ city: city })
    }))
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const getCountByType = async (req, res, next) => {

  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      hotelCount,
      apartmentCount,
      resortCount,
      villaCount,
      cabinCount
    ]);
  } catch (err) {
    next(err);
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    ); 
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
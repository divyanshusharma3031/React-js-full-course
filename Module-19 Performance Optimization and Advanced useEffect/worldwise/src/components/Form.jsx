// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setisLoadingGeoCoding] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [emoji, setemoji] = useState("");
  const [error, seterror] = useState(null);
  const { createCity } = useCities();
  const navigate=useNavigate();
  useEffect(() => {
    if (!lat || !lng) {
      return;
    }
    async function fetchCityData() {
      try {
        setisLoadingGeoCoding(true);
        seterror(null);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click Somewhere else"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setemoji(convertToEmoji(data.countryCode));
      } catch (err) {
        seterror(err.message);
      } finally {
        setisLoadingGeoCoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);
  if (!lat || !lng) {
    return <Message message={"Start by clicking somewhere on the Map"} />;
  }
  if (isLoadingGeoCoding) {
    return <Spinner />;
  }
  if (error) {
    return <Message message={error} />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };
    const data=await createCity(newCity);
    console.log(data);
    navigate("/app/cities");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

import React, { useState, useEffect } from "react";
import Form from "../../components/form/form";
import LittleCard from "../../components/littleCard/littleCard";
import Hero from "../../components/hero/hero";
import "../lyrics/lyrics.css";
const Lyrics = () => {
  const [search, setSearch] = useState({
    band: "",
    song: "",
  });
  const [lyrics, setLyrics] = useState("");
  const [info, setInfo] = useState(null);
  const [lyricsError, setLyricsError] = useState(false);
  const [bandError, setBandError] = useState(false);

  useEffect(() => {
    const getLyrics = async () => {
      const url = `https://api.lyrics.ovh/v1/${search.band}/${search.song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search.band}`;

      const request = await fetch(url);
      const request2 = await fetch(url2);
      const response = await request.json();
      const response2 = await request2.json();

      if (response.lyrics) {
        let dataFormat = {};
        dataFormat = {
          topText: search.band + " " + search.song,
          principalText: response.lyrics,
        };
        setLyrics(dataFormat);
        setLyricsError(false);
      } else {
        setLyricsError(true);
        setLyrics("");
      }

      if (response2.artists != null) {
        setInfo(response2.artists[0]);
        setBandError(false);
      } else {
        setBandError(true);
        setInfo(null);
      }
    };
    if (search.band !== "") getLyrics();
  }, [search]);

  const handleSubmit = (data) => {
    console.log(data);
    setSearch({
      band: data[0],
      song: data[1],
    });
  };

  return (
    <div className="cocktail__container">
      <Hero title={"Search your favorite song"} className={"lyricsHero"} />
      <Form
        name="lyrics__form"
        inputs={[
          {
            label: "",
            type: "text",
            placeholder: "Type a band",
            icon: "",
            name: "band",
          },
          {
            label: "",
            type: "text",
            placeholder: "Type a song",
            icon: "",
            name: "song",
          },
        ]}
        button={{ name: "btn__lyrics", type: "Submit", text: "Search" }}
        callback={handleSubmit}
      />
      <div className="lyrics__card">
        {lyrics && <LittleCard data={lyrics} name={"lyric__card"} />}

        {lyricsError == true && (
          <h1 className="lyricsError">Lyrics not found Sorry :c </h1>
        )}

        {info != null && (
          <img className="band__img" src={info.strArtistThumb} />
        )}

        {bandError == true && (
          <h1 className="bandError"> Band not found Sorry :c</h1>
        )}
      </div>
    </div>
  );
};

export default Lyrics;

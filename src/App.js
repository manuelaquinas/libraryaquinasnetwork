import "./App.css";
import axios from "axios";
import CardList from "./Components/CardList";
import CardListVideo from "./Components/CardListVideo";
import React, { useState } from "react";
import SearchInformation from "./Components/SearchInformation";

const App = () => {
  let [dataGoogle, setDataGoogle] = useState(null);
  let [dataYoutube, setDataYoutube] = useState(null);
  let [search, setSearch] = useState("");
  let [afterYear, setAfterYear] = useState(2000);
  let [beforeYear, setBeforeYear] = useState(2023);
  let [language, setLanguage] = useState("");

  const getData = (event) => {
    event.preventDefault();
    if (search) {
      getDataGoogle();
      getDataYoutube();
    }
  };

  const getDataGoogle = () => {
    // const URL = `${URLApi}engine=google_scholar&q=${search.replace(
    //   " ",
    //   "+"
    // )}&num=20&as_ylo=${afterYear}&as_yhi=${beforeYear}&hl=${language}&api_key=${apiKey}`;

    axios({
      method: "post",
      url: "search",
      data: {
        engine: "google_scholar",
        query: search.replace(" ", "+"),
        num: 20,
        as_ylo: afterYear,
        as_yhi: beforeYear,
        hl: language,
      },
    })
      .then((response) => {
        console.log("GOOGLE", response.data);
        setDataGoogle(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataYoutube = () => {
    // const URL = `${URLApi}engine=google_videos&q=${search.replace(
    //   " ",
    //   "+"
    // )}&num=20&hl=${language}&api_key=${apiKey}`;
    // axios
    //   .get(URL)
    axios({
      method: "post",
      url: "search",
      data: {
        engine: "google_videos",
        query: search.replace(" ", "+"),
        num: 20,
        hl: language,
      },
    })
      .then((response) => {
        console.log("VIDEOS", response.data);
        setDataYoutube(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="">

        <form action="#" className="formContainer">

          <div className="headerSection">
            <div className="container d-flex ">
              <h1 className="title col-2 my-2">Olib</h1>
              <div class="input-group my-3">
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={(event) => setSearch(event.target.value)} value={search}></input>
                <button class="btn btn-secondary" type="button" onClick={getData} id="button-addon2">Go</button>
              </div>
            </div>
          </div>
          <div className="container d-flex  align-items-end">
            <div class="mb-3 col-2">
              <label for="floatingInputValue" className="form-label">From:</label>
              <input
                onChange={(event) => setAfterYear(event.target.value)}
                type="number"
                className="form-control"
                id="afterYear"
                name="afterYear"
                min="1990"
                max="2023"

                value={afterYear}></input>
            </div>

            <div class="mb-3 mx-2 col-2">
              <label for="beforeYear" className="form-label">To:</label>
              <input
                onChange={(event) => setBeforeYear(event.target.value)}
                type="number"
                className="form-control"
                id="beforeYear"
                name="beforeYear"
                min="1990"
                max="2023"
                value={beforeYear}></input>

            </div>

            <div className="mb-3 col-2">
              <label for="floatingSelect" className="form-label">Language:</label>
              <select class="form-select"
                className="searchFieldDate form-select"
                name="lenguajes"
                id="miSelect"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                aria-label="Floating label select example">
                <option selected value="">Any language</option>
                <option value="zh-cn">Chinese</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
              </select>

            </div>
            <ul class="nav nav-pills mx-4 mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All results</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-scholar-tab" data-bs-toggle="pill" data-bs-target="#pills-scholar" type="button" role="tab" aria-controls="pills-scholar" aria-selected="false">Google Scholar</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-scholar-tab" data-bs-toggle="pill" data-bs-target="#pills-video" type="button" role="tab" aria-controls="pills-video" aria-selected="false">Google Videos</button>
              </li>
            </ul>
          </div>
        </form>

      </div>
      <div className="container resultsSection">
        <SearchInformation dataGoogle={dataGoogle} dataYoutube={dataYoutube} />
        <div className="tab-content" id="pills-tabContent">

          <div className="SearchContainer tab-pane fade show active"id="pills-home"role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="SearchContainer">
              <CardList data={dataGoogle} />
              <CardListVideo data={dataYoutube} />
            </div>
          </div>


          <div className="SearchContainer tab-pane fade"  id="pills-scholar" role="tabpanel" aria-labelledby="pills-scholar-tab"> 
            <h2 className="SearchContainerTitle mt-4">Google Scholar Data</h2>
            <CardList data={dataGoogle} />
          </div>


          <div className="SearchContainer tab-pane fade"  id="pills-video" role="tabpanel" aria-labelledby="pills-video-tab">
            <h2 className="SearchContainerTitle mt-4">Google Videos Data</h2>
            <CardListVideo data={dataYoutube} />
          </div>



        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
};

export default App;
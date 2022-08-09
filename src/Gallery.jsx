import { useEffect, useState } from "react";
import FormControl from "./components/Forms/FormControl";
import CatArtForm from "./components/Forms/CatArtForm";
import Modal from "./components/Modal/Modal";
import "./Gallery.css";

function Gallery() {
    const [artList, setArtList] = useState([]);
  
    const [art, setArt] = useState({
      art_id: ""
    });
  
    const [newArt, setNewArt] = useState({
      name: "",
      image: ""
    });

   // flag para o modal
   const [showModal, setShowModal] = useState(false);
    

const baseURL= "http://localhost:8000/gallery";

async function ReadAllArts() {
    const response = await fetch(baseURL);          
    const arts = await response.json();
    setArtList(arts);
  };

  async function findOneArt(id){
    const response = await fetch(`${baseURL}/${id}`)              
    const art = await response.json()
    setArtList([art]);
  };
  
  async function create(art){
    const response = await fetch(baseURL, {            
    method: 'post',                              
    headers: {
    'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(art)
    })
    const newArt = await response.json()
    setNewArt([newArt]);
  };

  const handleChangeSearch = (event) => {
    setArt({...art, [event.target.name]: event.target.value});
  };

  const handleClickSearch = () => {
    const art_id_search = art.art_id;
    findOneArt(art_id_search);
  };

  const handleChangeCreate = (event) => {
    setNewArt({...newArt, [event.target.name]: event.target.value});
  };

  const handleClickCreate = () => {
    const Art_being_created = {...newArt};
    create(Art_being_created);
    setNewArt({
      name: "",
      image: ""
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    ReadAllArts();
  }, [newArt]);

  return (
    <>
      <div className="forms">
        <button type="button" className="btn_add" onClick={() => setShowModal(true)}>Add a new art</button>

        {showModal ? (
        <Modal closeModal={closeModal}>
          <CatArtForm
            id="create_art"
            onChange={handleChangeCreate}
            name_value={newArt.name}
            image_value={newArt.image}
            onClick={handleClickCreate}
            button_label={"Add"}
          />
        </Modal> )
        : null
        }

        {/* <FormControl
          id="searchArt"
          placeholder="Search by ID"
          className="FormSeachAndCreate"
          type="text"
          onChange={handleChangeSearch}
          name="art_id"
          value={art.art_id}
        />
      
      <svg onClick={handleClickSearch} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg> */}

      
   
      <FormControl
          id="searchArt"
          placeholder="Search by ID"
          className="searchTerm"
          type="text"
          onChange={handleChangeSearch}
          name="art_id"
          value={art.art_id}
        />
      
      <svg onClick={handleClickSearch} xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="searchButton" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
     
  
  

      </div>


      {artList.map((art, index) => (

        
          <div key={index} className="cards">
          <img
                className="foto"
                src={art.image}
                alt={art.name}
            />
            <p>{art.name}</p>
          </div>
      
      ))}
    </>
  )

}

export default Gallery;
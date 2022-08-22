import { useEffect, useState } from "react";
import { ArtService } from "../services/ArtService";
import FormControl from "../Forms/FormControl";
import CatArtForm from "../Forms/CatArtForm";
import Modal from "../Modal/Modal";
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

    const [editedArt, setEditedArt] = useState({
      id:"",
      name: "",
      image: ""
    });

   // flags para os modals
   const [showModal, setShowModal] = useState(false);

   const [showModalEdit, setShowModalEdit] = useState(false);

   const [showModalDelete, setShowModalDelete] = useState(false);

  async function ReadAllArts() {
  const art = await ArtService.getList();
    setArtList(art);
  };

  async function findOneArt(id){
    const art = await ArtService.getById(id);
    setArtList([art]);
  };
  
  async function create(art){
    const newArt = await ArtService.create(art);
    setNewArt([newArt]);
  };

  async function update(id) {
    const response_att_art = await ArtService.updateById(id, editedArt);
    setEditedArt({...response_att_art});  // att o state
  };

  async function deleteArt(id){
    const response_art_deletada = await ArtService.deleteById(id);
    setEditedArt({...response_art_deletada}); // att o state
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
    setShowModal(false);
    setNewArt({
      name: "",
      image: ""
    });
  };

  const handleChangeEdit = (event) => {
    setEditedArt({...editedArt, [event.target.name]: event.target.value});
  };

  const handleUpdate = () => {
    const art_being_edited = {...editedArt};
    const id = art_being_edited.id;

    delete art_being_edited.id;
    setShowModalEdit(false)
    update(id, art_being_edited);
  };

  const handleClickEdit = async (event) => {
    setShowModalEdit(true)
    setEditedArt ({ ...editedArt, id: event.target.id});
    const art = await ArtService.getById(event.target.id);
    setEditedArt ({ ...editedArt, ...art});
  };

  const handleClickDeleteWarning = (e) => { 
    setShowModalDelete(true);
    setArt({art_id: e.target.id});
  };

  const handleClickDelete = () => {
    deleteArt(art.art_id);
    setEditedArt({...editedArt, ...art});
    setShowModalDelete(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  useEffect(() => {
    ReadAllArts();
  }, [newArt, editedArt]);

  return (
    <>
      <div className="forms">
        <button type="button" className="button_add" onClick={() => setShowModal(true)}>Add a new art</button>

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

        <FormControl
          id="searchArt"
          placeholder="Search by ID"
          className="searchTer"
          type="text"
          onChange={handleChangeSearch}
          name="art_id"
          value={art.art_id}
        />

        {/* botão search */}
        <svg onClick={handleClickSearch} xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="searchButton" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </div>

      <div className="container"> 

        {artList.map((art, index) => (
          <div key={index} className="card">
            <div key={index} className="frame">
              <img
                    className="pic"
                    src={art.image}
                    alt={art.name}
              />
            </div>
            <p>{art.name}</p>
            
            {showModalEdit ? (
              <Modal closeModal={closeModalEdit}>
                <CatArtForm
                  onChange={handleChangeEdit}
                  name_value={editedArt.name}
                  image_value={editedArt.image}
                  onClick={handleUpdate}
                  button_label={"Done"}
                  />
              </Modal> )
              : null
            }

            {showModalDelete ? (
              <Modal closeModal={closeModalDelete}>
                <p className="tx_warning">Are you sure you want to delete this art?</p>
                <button id={art.id} type="buttonDel" className={`btn_delete`} onClick={handleClickDelete}>
                  Delete
                </button>
              </Modal> )
              : null
            }
        
            <div className="icons"> 
              <svg id={art.id}
                onClick={handleClickEdit} 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="iconEd" 
                viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg> 

              <svg  id={art.id} 
                onClick={handleClickDeleteWarning} 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="iconTr" 
                viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg> 
            </div> 
          </div>
        ))}
      </div>
    </>
  )
}

export default Gallery;
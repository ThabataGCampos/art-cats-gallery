import FormControl from "./FormControl";

function CatArtForm(props) {
  return (
    <div className="create-form">
      <FormControl
        id="name"
        className="form_name"
        label="Name"
        type="text"
        onChange={props.onChange}
        name="name"
        value={props.name_value}
      />
      <FormControl
        id="image"
        className="form_image"
        label="Image"
        type="text"
        onChange={props.onChange}
        name="image"
        value={props.image_value}
      />
      <button
        type="button"
        className="button_create"
        onClick={props.onClick}
      >
        {props.button_label}
      </button>
    </div>
  );
}
export default CatArtForm;
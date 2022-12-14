function FormControl(props) {
    return (
      <div className="control">
        <label htmlFor={props.id} className="form-label">
          {props.label}
        </label>
        <input
          type={props.type}
          className={props.className}
          placeholder={props.placeholder}
          id={props.id}
          onChange={props.onChange}
          name={props.name}
          value={props.value}
        />
      </div>
    );
  }
  export default FormControl;
const InputFields = ({ labelName, labelId, inputName, inputId, onChange }) => {
  return (
    <div className="flex gap-3 flex-col">
      <label htmlFor={labelId}>{labelName}</label>
      <input
        type="search"
        name={inputName}
        id={inputId}
        onChange={onChange}
        className="rounded-md shadow focus:outline-none text-gray-500 bg-gray-100 px-4 py-1 "
      />
    </div>
  );
};

export default InputFields;

import ReactSelect from "react-select";

export function Select({ arrayOptions, defaultValue, changeValue }) {
  const customStyles = {
    singleValue: (styles) => ({
      ...styles,
      color: "#808080",
    }),
    control: (styles, state) => ({
      ...styles,
      boxShadow: "none !important",
      height: "50px",
      border: state.isFocused ? "1px solid #28a745" : styles.border,
      borderRadius: "4px",
      "&:hover": {
        borderColor: "none",
      },
      // minHeight: "0rem",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "50px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "0px",
      display: "none",
    }),
  };

  return (
    <ReactSelect
      options={arrayOptions}
      placeholder="Selecione..."
      loadingMessage={() => "Carregando..."}
      noOptionsMessage={() => "Nenhum registro encontrado"}
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={(event) => changeValue(event)}
      classNamePrefix="react-select"
    />
  );
}

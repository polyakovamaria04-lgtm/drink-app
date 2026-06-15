import Select from "react-select";

const baseStyles = (width, menuWidth, variant) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",

    border: variant === "line" ? "none" : "1px solid rgba(243, 243, 243, 0.2)",

    borderBottom:
      variant === "line"
        ? state.isFocused
          ? "1px solid rgba(243, 243, 243, 0.5)"
          : "1px solid rgba(243, 243, 243, 0.2)"
        : provided.borderBottom,

    borderRadius: variant === "line" ? "0px" : "200px",
    height: "54px",
    paddingLeft: variant === "line" ? "0px" : "10px",
    boxShadow: "none",
    cursor: "pointer",

    "&:hover": {
      borderColor: variant === "line" ? "none" : "rgba(243, 243, 243, 0.5)",

      borderBottom:
        variant === "line" ? "1px solid rgba(243, 243, 243, 0.5)" : "none",
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#f3f3f3",
    fontSize: "14px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "rgba(243, 243, 243, 0.5)",
    fontSize: "14px",
  }),
  menuList: (provided) => ({
    ...provided,
    "::-webkit-scrollbar": {
      width: "0px",
      height: "0px",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#161f37",
    borderRadius: "20px",
    border: "none",
    overflow: "hidden",
    marginTop: "8px",
    width: menuWidth || "100%",
    zIndex: 10,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgba(67, 97, 238, 0.2)"
      : state.isFocused
        ? "rgba(243, 243, 243, 0.05)"
        : "transparent",

    color:
      state.isSelected || state.isFocused
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(243, 243, 243, 0.4)",
    padding: "12px 20px",
    fontSize: "14px",
    cursor: "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#f3f3f3",
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",

    "&:hover": {
      color: "#f3f3f3",
    },
  }),
});

const mergedStyles = (base, custom) => {
  const result = { ...base };

  Object.keys(custom).forEach((key) => {
    result[key] = (provided, state) => {
      const baseStyle = base[key] ? base[key](provided, state) : provided;

      return custom[key](baseStyle, state);
    };
  });

  return result;
};

export const Selector = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  width = "100%",
  menuWidth,
  variant = "capsule",
  customStyles = {},
}) => {
  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );

  const currentOption =
    formattedOptions.find((opt) => opt.value === value) || null;

  return (
    <div style={{ width }}>
      <Select
        options={formattedOptions}
        value={currentOption}
        onChange={(selected) => onChange(selected ? selected.value : "")}
        placeholder={placeholder}
        styles={mergedStyles(
          baseStyles(width, menuWidth, variant),
          customStyles,
        )}
        isSearchable={false}
      />
    </div>
  );
};

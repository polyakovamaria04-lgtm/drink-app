import { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../components/FormStyles.module.scss";
import CalendarIcon from "@/assets/svg/form-icons/calendar.svg?react";

const CustomInput = forwardRef(
  ({ value, onClick, onChange, placeholder, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      value={value}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputField}
      readOnly={false}
    />
  ),
);
export const BirthdateInput = ({
  id,
  value,
  onChange,
  onBlur,
  error,
  setError,
  isCorrect,
  setIsCorrect,
  placeholder,
}) => {
  const datePickerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperClassName = `
    ${styles.inputWrapper} 
    ${styles.birthdateWrapper}
    ${error ? styles.fieldError : ""} 
    ${isCorrect && !error ? styles.fieldCorrect : ""}
  `.trim();

  const validateAge = (selectedDate) => {
    if (!selectedDate || isNaN(selectedDate.getTime())) {
      setError?.("Please enter a valid date");
      setIsCorrect?.(false);
      return;
    }

    const today = new Date();
    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < selectedDate.getDate())
    ) {
      age--;
    }

    if (age < 10) {
      setError?.("You must be at least 10 years old");
      setIsCorrect?.(false);
    } else {
      setError?.("");
      setIsCorrect?.(true);
    }
  };

  const handleDateChange = (date) => {
    onChange(date);
    if (date) {
      validateAge(date);
    }
    setIsOpen(false);
  };

  const handleRawChange = (e) => {
    const raw = e?.target?.value;
    if (typeof raw !== "string") return;

    let value = raw.replace(/[^0-9]/g, "");

    let displayValue = value;
    if (value.length > 2 && value.length <= 4) {
      displayValue = value.slice(0, 2) + "." + value.slice(2);
    } else if (value.length > 4) {
      displayValue =
        value.slice(0, 2) + "." + value.slice(2, 4) + "." + value.slice(4, 8);
    }

    onChange(displayValue);

    if (displayValue.length === 10) {
      const [d, m, y] = displayValue.split(".").map(Number);

      if (d < 1 || d > 31 || m < 1 || m > 12 || y > 2015) {
        setError?.("Invalid date: check day, month or year (<=2015)");
        setIsCorrect?.(false);
        return;
      }

      const date = new Date(y, m - 1, d);
      if (
        date.getDate() === d &&
        date.getMonth() === m - 1 &&
        date.getFullYear() === y
      ) {
        onChange(date);
        validateAge(date);
      } else {
        setError?.("Invalid date");
        setIsCorrect?.(false);
      }
    } else if (displayValue.length > 0) {
      setError?.("");
      setIsCorrect?.(false);
    }
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const today = new Date();
  const maxDate = today;
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate(),
  );

  const years = Array.from({ length: 101 }, (_, i) => today.getFullYear() - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.inputMainFieldContainer} style={{ zIndex: 10 }}>
      <div className={wrapperClassName}>
        <DatePicker
          ref={datePickerRef}
          selected={value instanceof Date ? value : null}
          value={typeof value === "string" ? value : undefined}
          onChange={handleDateChange}
          onChangeRaw={handleRawChange}
          onBlur={onBlur}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          customInput={<CustomInput />}
          minDate={minDate}
          maxDate={maxDate}
          shouldCloseOnSelect={true}
          calendarStartDay={1}
          popperPlacement="top-start"
          popperContainer={({ children }) => <div>{children}</div>}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={styles.customCalendarHeader}>
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className={styles.navButton}>
                &#10094;
              </button>

              <div className={styles.headerTitleContainer}>
                <span>{months[date.getMonth()]}</span>
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) =>
                    changeYear(Number(value))
                  }
                  className={styles.headerYearSelect}>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className={styles.navButton}>
                &#10095;
              </button>
            </div>
          )}
        />

        <div
          className={styles.iconRightArea}
          onClick={handleIconClick}
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
            cursor: "pointer",
          }}>
          <CalendarIcon
            className={`${styles.inputIcon} ${styles.iconCalendar}`}
          />
        </div>
      </div>

      <div className={styles.hintContainer}>
        {error ? (
          <span className={styles.errorHint}>{error}</span>
        ) : isCorrect ? (
          <span className={styles.successHint}>
            This is a CORRECT birthdate
          </span>
        ) : (
          <span className={styles.errorHint} style={{ visibility: "hidden" }}>
            &nbsp;
          </span>
        )}
      </div>
    </div>
  );
};

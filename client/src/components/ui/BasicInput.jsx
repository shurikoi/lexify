import { observer } from "mobx-react-lite"
import styles from "./BasicInput.module.css"
import { Context } from "../../contexts/Context"
import { useContext } from "react"

export default function BasicInput({
  className = "",
  placeholder,
  value,
  setValue,
  isFilled = true,
  handleSubmit,
  type = "text",
  colorScheme = "default"
}) {
  const handleKeyDown = (e) => {
    if (e.key == "Enter" && isFilled) handleSubmit()
  }

  const colorSchemes = {
    "default": styles.default,
    "red": styles.red,
  }

  return (
    <input
      className={`${styles.emailInput} ${colorSchemes[colorScheme]} ${className}`}
      type={type}
      placeholder={placeholder}
      autoCapitalize="off"
      autoComplete="false"
      value={value}
      onChange={(e) => {
        setValue(e.target.value.trim())
      }}
      onKeyDown={handleKeyDown}
    />
  )
}
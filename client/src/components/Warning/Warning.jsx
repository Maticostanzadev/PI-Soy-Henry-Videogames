import './warning.css'

export default function Warning({ message }) {
  return (
    <div className="warningContainer">
      <h2 className="warningText">{message}</h2>
    </div>
  )
}
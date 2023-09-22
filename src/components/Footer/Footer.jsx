export const Footer = ({porcentaje}) => {
  return (
    <div className="position-fixed fixed-bottom">
      <div className="progress">
        <div className="progress-bar bg-success progress-bar-animated" role="progressbar" style={{ width: `${porcentaje * 100}%` }}></div>
      </div> 
    </div>
  )
}

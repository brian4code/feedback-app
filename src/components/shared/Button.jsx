import PropTypes from 'prop-types'

// custom Button component 

function Button({ children, version, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`} >
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',       // primary displays blue button
  type: 'button',
  isDisabled: false
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
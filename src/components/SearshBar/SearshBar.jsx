import PropTypes from 'prop-types'
import css from './SearshBar.module.css'
import { useState } from 'react'

const SearshBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
const handleSubmit = e => {
        e.preventDefault();
        onSubmit(value.trim() );
  }
  
  return (
    <header className={css.searchbar}>
  <form onSubmit={handleSubmit} className={css.searchForm}>
    <button type="submit" className={css.searchForm__button}>
      <span className={css.button__label}>Search</span>
    </button>

    <input
      className={css.searchForm__input}
      type="text"
      autoComplete="off"
      // autofocus
      placeholder="Search images and photos"
      value={value}
      onChange = {e=>setValue(e.target.value)}              
    />
  </form>
</header>
  )
}

SearshBar.propTypes = {
  onSubmit: PropTypes.func
}

export default SearshBar
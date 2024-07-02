import './CountrySelector.css'
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import './../../styles/defaultDesign.css'

function CountrySelector() {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  return (
    <div className='CountrySelector--container'>
      <div className='CountrySelector--header'>
        <span className='pc-body fs-12'>국가</span>
      </div>
      <Select 
        placeholder="국가 선택" 
        options={options} 
        value={value} 
        onChange={changeHandler} 
      />
    </div>
  )
}

export default CountrySelector
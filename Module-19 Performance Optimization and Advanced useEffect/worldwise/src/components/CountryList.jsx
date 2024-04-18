import React from 'react'
import Spinner from './Spinner'
import styles from './CountryList.module.css'
import Message from './Message'
import CountryItem from './CountryItem'
function CountryList({cities,isLoading}) {
  if(isLoading)
  {
    return <Spinner/>
  }
  if(!cities.length)
  {
    return <Message message="Add Countries to continue"/>
  }
  const countries=[];
  const included=[];
  cities.forEach(element => {
    if(included.includes(element.country))
    {
    }
    else
    {
      countries.push({id:element.id,country:element.country,emoji:element.emoji});
      included.push(element.country);
    }
  });
  return (
    <ul className={styles.countryList}>
      {countries.map((country)=>{
        return <CountryItem country={country} key={country.id}/>
      })}
    </ul>
  )
}

export default CountryList
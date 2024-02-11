import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import Slider from "react-slick";
import axios from 'axios';
import icon from './Logo1.jpg';
import { Helmet } from 'react-helmet-async';

export default function Categories() {

  const [categories, setCategories] = useState([])

  async function getCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log(data.data);
    setCategories(data.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
        <link rel="icon" href={icon} />
      </Helmet>

      <Slider {...settings} className={styles.width}>
        {categories.map((Category) => <div key={Category._id}>
          <img height={300} width={'100%'} src={Category.image} alt="" />
          <h3 className='h6'>{Category.name}</h3>
        </div>)}
      </Slider>

    </>
  );
}
'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Banner.module.scss';
import { Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import hoodiesImage from '@/app/images/hoodies.webp'
import tshirtsImage from '@/app/images/t-shirts.webp'
import accessoriesImage from '@/app/images/accessories.webp'
import Link from 'next/link';
import { StaticImageData } from 'next/image';

type CustomRoute =  '/products/t-shirts' | '/products/hoodies' | '/products/accessories';


type CategorySlideType = {
  name: string
  href: CustomRoute
  image: StaticImageData
  description: string
};

const categorySlide: CategorySlideType[] = [
  {name: 'T-shirts', 
  href: "/products/t-shirts",  
  image: tshirtsImage, 
  description: 'Comfortable, trendy t-shirts perfect for everyday casual wear.'
  },
  {name: 'Hoodies', 
  href: '/products/hoodies', 
  image: hoodiesImage, 
  description: 'Cozy, stylish hoodies for all seasons and casual wear.'
  },
  {name: 'Accessories', 
  href: '/products/accessories', 
  image: accessoriesImage, 
  description: 'Chic, versatile accessories to complete any outfit.'
  },
]

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <Swiper
      cssMode={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      keyboard={true}
      modules={[ Mousewheel, Keyboard, Autoplay]}
      className={styles.swiper}
    >
      {categorySlide.map(({name, description, href, image}) => <SwiperSlide key={name} className={styles.swiperSlide}>
        <div className={styles.bannerContent} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image.src})`}}>
          <div className={styles.textWrapper}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.description}>{description}</p>
            <Link className={styles.link} href={href}>See</Link>
          </div>
        </div></SwiperSlide>)}
    </Swiper>
    </div>
    
  );
}

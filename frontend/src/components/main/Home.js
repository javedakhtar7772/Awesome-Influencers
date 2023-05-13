import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import {NavLink} from "react-router-dom"

import './home.css';
import "swiper/css";
import "swiper/css/pagination";


import { Pagination } from "swiper";

const Home = () => {
  return (
    <>
    <>
  <section className="header" style={{backgroundImage: "linear-gradient(rgba(4,9,30,0.8),rgba(4,9,30,0.8)), url(/banner2.jpg)"}}>
    <nav>
      <a href="index.html">
        <img src="/logo12.png" width={100} />
      </a>
      <div className="nav-links">
        <ul>
          {/* <i class="fa fa-times"></i> */}
          <li>
            <a href="">HOME</a>
          </li>
          <li>
            <NavLink to="">ABOUT</NavLink>
          </li>
          <li>
            <NavLink to="/course.html">COURSE</NavLink>
          </li>
          <li>
            <NavLink to="">BLOG</NavLink>
          </li>
          <li>
            <NavLink to="">CONTACT</NavLink>
          </li>
          <li>
            <NavLink to="/login.html">LOGIN</NavLink>
          </li>
          
        </ul>
      </div>
      {/* <i class="fa fa-bars" aria-hidden="true"></i> */}
    </nav>
    <div className="text-box">
      <h1>AWESOME INFLUENCERS</h1>
      <p className="p">
        “You don’t have to be a ‘person of influence’ to be influential. In
        fact, the most influential people in my life are probably not even aware
        of the things they’ve taught me.”{" "}
      </p>
      <a className="hero-btn" href="/login.html">
        Influencer
      </a>
      <a className="hero-btn" href="/login.html">
        Brand
      </a>
    </div>
  </section>
  <hr />
  {/* COURSE */}
  <section className="course">
    <h1>Features</h1>
    <p>
      Though there are some key differences between them, today’s social media
      influencers <br /> have much in common with traditional entrepreneurs when
      it comes to driving the economy.
    </p>
    <div className="row">
      <div className="course-col">
        <h3>Building a Brand</h3>
        <p>
          Building a brand is critical for both influencers and entrepreneurs,
          but they do it in different ways. Entrepreneurs build their brands
          slowly over time as they create their business. First, they determine
          what sets their brand apart from others, then they figure out how to
          communicate that to consumers. While a lot of brand-building happens
          before a company goes to market, some of it happens when the product
          or service hits the marketplace and gets feedback from the consumers.
          For entrepreneurs, the profit-making product or service comes first,
          and the brand comes second.
        </p>
      </div>
      <div className="course-col">
        <h3>Making Money</h3>
        <p>
          Most entrepreneurs make money from their businesses in a
          straightforward way. Profit is made when money is earned above the
          cost of producing and selling goods and services. Most businesses sell
          the good or service for more than it costs to make them, which creates
          profit. Influencers have a murkier path. After building up an audience
          of followers, influencers may enter partnerships with companies or
          advertisers where they are paid to post about a product or service.
          With social media channels, like YouTube or Instagram
        </p>
      </div>
      <div className="course-col">
        <h3>Driving the Economy</h3>
        <p>
          Entrepreneurship is a major driver of economic growth, and as
          influencers have grown in number and become more and more popular, it
          has become clear that they are helping to drive the economy as well.
          Entrepreneurs stimulate economic growth in many ways. By fulfilling a
          need for a good or service, entrepreneurs create new categories and
          markets, and create competition. For example, after Uber was created
          to fulfill the need of wider taxi accessibility, a number of
          ride-sharing companies sprang up in this new category.{" "}
        </p>
      </div>
    </div>
  </section>
  <section className="campus">
    <h1>Why choose US</h1>
    <div className="choose-us">
      <div>
        <h5>
          "As the founder of a platform that analyzes influencer audiences, I
          know that in order to make the right decisions for your brand, you
          have to look behind the profiles. You need to evaluate other metrics,
          such as engagement rate, audience demographics and authenticity. And
          of course, you have to consider the price tag"
        </h5>
      </div>
      <img className="choose-img" src="/about.jpg" />
    </div>
  </section>

  

  {/* Testimonials */}
  <section className="Testimonials">
    <h1 style={{ textAlign: "center", paddingBottom: 40 }}>Testimonials</h1>


    <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className="card">
          <div className="card-body">

          <div className="img">
            <img className='d-block m-auto' src="shamim (2).jpg" alt="img" draggable="false" />
          </div>
          <h2 className='text-center'>Mohd Shamim</h2>
          <p className='text-center'>Web Developer</p>
          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card">
          <div className="card-body">

          <div className="img">
            <img className='d-block m-auto' src="img-2.jpg" alt="img" draggable="false" />
          </div>
          <h2 className='text-center'>Joenas Brauers</h2>
          <p className='text-center'>Web Developer</p>
          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card">
          <div className="card-body">

          <div className="img">
            <img className='d-block m-auto' src="img-3.jpg" alt="img" draggable="false" />
          </div>
          <h2 className='text-center'>Lariach French</h2>
          <p className='text-center'>Web Developer</p>
          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card">
          <div className="card-body">

          <div className="img">
            <img className='d-block m-auto' src="img-4.jpg" alt="img" draggable="false" />
          </div>
          <h2 className='text-center'>Mohd Shamim</h2>
          <p className='text-center'>Web Developer</p>
          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card">
          <div className="card-body">

          <div className="img">
            <img className='d-block m-auto' src="img-5.jpg" alt="img" draggable="false" />
          </div>
          <h2 className='text-center'>Kristina Zasiadko</h2>
          <p className='text-center'>Web Developer</p>
          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card">
          <div className="card-body">

          <div className="img">
            <img className='d-block m-auto' src="img-6.jpg" alt="img" draggable="false" />
          </div>
          <h2 className='text-center'>Donald Horton</h2>
          <p className='text-center'>Web Developer</p>
          </div>
        </div>
        </SwiperSlide>
      </Swiper>
      
  </section>
  <footer> <small>Copyright © 2023 Awesome Influensers . All Rights Reserved.</small></footer>
</>



    </>
  )
}

export default Home;
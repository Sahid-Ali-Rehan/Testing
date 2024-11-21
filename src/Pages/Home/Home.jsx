import React, { useState } from 'react';

import Homepage from './Homepage'
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct'
import CategoryBanner from '../../components/CategoriesBanner/CategoriesBanner'
import Testimonials from '../../components/Customertestimonial/CustomerTestimonial'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navigation/Navbar'
import SearchModal from '../../components/Modals/SearchModal'
import CartModal from '../../components/Modals/CartModal'


const Home = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleSearchModal = () => setSearchOpen(!searchOpen);
  const toggleCartModal = () => setCartOpen(!cartOpen);

  return (
    <div>
              <Navbar 
          toggleSearchModal={toggleSearchModal} 
          toggleCartModal={toggleCartModal} 
        />

        {/* Modals for Search and Cart */}
        {searchOpen && <SearchModal closeModal={toggleSearchModal} />}
        
        {cartOpen && <CartModal closeModal={toggleCartModal} />}

        <Homepage/>
        {/* These components will always render */}
        <FeaturedProduct />
        <CategoryBanner />
        <Testimonials />
     <Footer/>
    </div>
  )
}

export default Home
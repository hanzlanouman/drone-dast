import React from 'react';
import Logo from './Logo';
import Image from 'next/image';
import UserInfo from './UserInfo';

const Header = () => {
  return (
    <header className='px-4 py-4 bg-[#0b0b0b]'>
      <div className='flex justify-between items-center'>
        <Logo />
        <div className='flex items-center gap-x-4'>
          {/* Icons & Actions */}
          <div className='flex items-center gap-x-4'>
            <Image
              src='/icon/capture-svgrepo-com.svg'
              alt='Search'
              width={22}
              height={24}
            />
            <Image
              src='/icon/language-svgrepo-com.svg'
              alt='Search'
              width={22}
              height={24}
            />
            <Image src='/icon/bell.svg' alt='Search' width={22} height={24} />
          </div>
          {/* User Info */}
          <div>
            <UserInfo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

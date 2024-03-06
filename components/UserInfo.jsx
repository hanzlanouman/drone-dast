import React from 'react';

const UserInfo = () => {
  return (
    <div className='pl-4 border-l border-gray-400 flex flex-col'>
      <h2 className='text-sm font-light text-[#eee]'>
        Hello, <span className='font-bold text-white'>Mohammad Omar</span>
      </h2>
      {/* role */}
      <h3 className='text-sm font-light text-gray-400'>Technical Support</h3>
    </div>
  );
};

export default UserInfo;

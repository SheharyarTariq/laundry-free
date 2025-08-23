import Image from 'next/image';
import React from 'react'
import Divider from '../divider';
import SecondaryButton from '../secondary-button';
import { routes } from '@/lib/utils/routes';

const Header = () => {
  return (
    <div className="bg-secondary">
      <Image src="/assets/common/logo.svg" width={130} height={50} className="py-4 px-6" alt="logo" />
      <Divider/>
      <div className="px-6 py-2 flex gap-2">
        <SecondaryButton route={routes.ui.dashboard}>Dashboard</SecondaryButton>
        <SecondaryButton route={routes.ui.areas}>Area</SecondaryButton>
        <SecondaryButton route={routes.ui.category}>Category</SecondaryButton>
        <SecondaryButton route={routes.ui.order}>Order</SecondaryButton>
        <SecondaryButton route={routes.ui.user}>User</SecondaryButton>
      </div>
    </div>
  )
}

export default Header; 
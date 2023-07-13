import React, { useEffect, useCallback, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import {logout as destroy, accountBalance } from '../../utils/near';
import Wallet from '../../components/Wallet';

function BhNav(args) {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState('0');
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
});

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Navbar expand="md" className="shadow">
        <NavbarBrand style={{ fontWeight: 'bold', color: 'rgb(38, 69, 100)' }}>
          BOOKHUB
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <Wallet
              address={account.accountId}
              amount={balance}
              symbol="NEAR"
              destroy={destroy}
            />
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}

export default BhNav;

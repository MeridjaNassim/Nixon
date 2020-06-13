import React , {FC} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'antd';
import PasswordGenerator from '../ui/components/passwordGenerator/passwordGenerator'
const Next : FC= () => {
  return (
    <React.Fragment>
      <Head>
        <title>⚡ Login - Nixon Password Manager ⚡</title>
      </Head>
      <div className="wrapper">
          <img src="/images/nixon.png" style={{
          
            width : '50%',
            maxWidth : '300px'
          }}/>
          <p className="pre">
            ⚡ Nixon Password Manager ⚡
        </p>

        <PasswordGenerator></PasswordGenerator>
          <style jsx>{`
            .wrapper {
              width : 100%;
              min-height: 100vh;
              margin : 0 auto;
              display : flex ;
              flex-direction : column ;
              justify-content : flex-start;
              align-items : center;
            
            }
            .pre {
              color : grey;
            }
          `}</style>
        </div>
    </React.Fragment>
  );
};

export default Next;

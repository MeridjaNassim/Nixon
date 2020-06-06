import  { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../ui/layout/layout'

import PasswordGenerator from '../ui/components/passwordGenerator';
const Home: FC = () => {

  return (
    <>
      <Head>
        <title> ⚡ Home - Nixon Password Manager ⚡</title>
      </Head>
      <Layout>
        <div className="wrapper">
          <img src="/images/nixon.png" width="400px" />
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
      </Layout>
    </>
  );
};

export default Home;

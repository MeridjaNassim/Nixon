import  { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../ui/layout/layout'
const Home: FC = () => {

  return (
    <>
      <Head>
        <title> ⚡ Home - Nixon Password Manager ⚡</title>
      </Head>
      <Layout>
        <div className="wrapper">
          <img src="/images/nixon.png" style={{
          
            width : '50%',
            maxWidth : '300px'
          }}/>
          <p className="pre">
            ⚡ Nixon Password Manager ⚡
        </p>

          <Link href="/password">
            <button>Go to generate password</button>
          </Link>
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

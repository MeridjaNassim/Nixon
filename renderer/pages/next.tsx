import React , {FC} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'antd';
const Next : FC= () => {
  return (
    <React.Fragment>
      <Head>
        <title>⚡ Login - Nixon Password Manager ⚡</title>
      </Head>
      <div className="wrapper">
        <p>
          ⚡ Login ⚡ -
          <Link href="/home">
            <Button>Go to home page</Button>
          </Link>
        </p>
        <style jsx>{`
            .wrapper {
              width : 60%;
              margin : 0 auto;
              display : flex ;
              flex-direction : column ;
              justify-content : flex-start;
              align-items : center;
            }
            .pre {
              
            }
          `}</style>
      </div>
    </React.Fragment>
  );
};

export default Next;

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'antd';
const Next = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/home">
            <Button>Go to home page</Button>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Next;

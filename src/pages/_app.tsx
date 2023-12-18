import '@/styles/globals.css'
import '@/styles/fonts.css'
import '@/styles/custom.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';
import { seoConfig } from 'next-seo.config';
import WindowResizeHandler from '@/handlers/WindowResizeHandler';
import store from '@/store/store';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <DefaultSeo {...seoConfig} />
      <WindowResizeHandler />
      <div className={`max-w-screen m-auto overflow-hidden bg-bg-main p-5 pb-[100px] min-h-screen`}>
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

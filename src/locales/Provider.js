import React, { Fragment } from 'react'

import { IntlProvider } from 'react-intl'
import {LOCALES, LOCALEs} from '../locales/locales';
import messages from './messages';

export default function IntProvider({children, locale = LOCALES.ENGLISH}) {
  return (
    <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
    >
        {children}
    </IntlProvider>
  )
}

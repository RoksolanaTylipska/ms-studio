import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18nConfig';

interface Props {
    children: ReactNode;
}

export const I18nProvider: React.FC<Props> = ({ children }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

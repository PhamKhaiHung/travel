import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#0EA5E9',
          'primary-darken-1': '#0284C7',
          'primary-lighten-1': '#38BDF8',
          secondary: '#F97316',
          'secondary-darken-1': '#EA580C',
          'secondary-lighten-1': '#FB923C',
          accent: '#14B8A6',
          'accent-darken-1': '#0D9488',
          'accent-lighten-1': '#2DD4BF',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
          success: '#10B981',
          background: '#FAFAFA',
          surface: '#FFFFFF',
        },
      },
    },
  },
  defaults: {
    VCard: {
      elevation: 4,
      rounded: 'xl',
    },
    VBtn: {
      rounded: 'lg',
      elevation: 2,
      style: 'padding: 12px 24px;',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
    },
  },
})


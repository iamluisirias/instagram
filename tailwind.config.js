// text-red-primary
// text-gray-base
// text-blue-medium
// border-gray-primary
// bg-blue-medium

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light: '#262626',
        faded: '#000059'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
        legend: '#8e8e8e'
      },
      red: {
        primary: '#ed4956'
      }
    }
  }
};

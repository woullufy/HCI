// Source A2 from Maximilian Schöll(12129652)

const COLORS = {
    primary: '#566246',
    secondary: '#A4C2A5',
    background: '#F1F2EB',
    surface: '#D8DAD3',
    textPrimary: '#212121',
    textSecondary: '#757575',
    border: '#5E5D5C',
    error: '#F44336',
    placeholder: '#4A4A48',
  };
  
  const FONTS = {
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: COLORS.textPrimary,
    },
    subheading: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.textPrimary,
    },
    body: {
      fontSize: 14,
      color: COLORS.textPrimary,
    },
    caption: {
      fontSize: 12,
      color: COLORS.textSecondary,
    },
  };
  
  const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  
  const RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
  };
  
  export { COLORS, FONTS, SPACING, RADIUS };
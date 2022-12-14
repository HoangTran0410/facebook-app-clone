import {Dimensions} from 'react-native';

export const Colors = {
  transparent: 'transparent',

  // colors export from www.facebook.com
  fds_black: '#000000',
  fds_black_alpha_05: 'rgba(0, 0, 0, 0.05)',
  fds_black_alpha_10: 'rgba(0, 0, 0, 0.1)',
  fds_black_alpha_15: 'rgba(0, 0, 0, 0.15)',
  fds_black_alpha_20: 'rgba(0, 0, 0, 0.2)',
  fds_black_alpha_30: 'rgba(0, 0, 0, 0.3)',
  fds_black_alpha_40: 'rgba(0, 0, 0, 0.4)',
  fds_black_alpha_50: 'rgba(0, 0, 0, 0.5)',
  fds_black_alpha_60: 'rgba(0, 0, 0, 0.6)',
  fds_black_alpha_80: 'rgba(0, 0, 0, 0.8)',
  fds_blue_05: '#ECF3FF',
  fds_blue_30: '#AAC9FF',
  fds_blue_40: '#77A7FF',
  fds_blue_60: '#1877F2',
  fds_blue_70: '#2851A3',
  fds_blue_80: '#1D3C78',
  fds_button_text: '#444950',
  fds_comment_background: '#F2F3F5',
  fds_dark_mode_gray_35: '#CCCCCC',
  fds_dark_mode_gray_50: '#828282',
  fds_dark_mode_gray_70: '#4A4A4A',
  fds_dark_mode_gray_80: '#373737',
  fds_dark_mode_gray_90: '#282828',
  fds_dark_mode_gray_100: '#1C1C1C',
  fds_gray_00: '#F5F6F7',
  fds_gray_05: '#F2F3F5',
  fds_gray_10: '#EBEDF0',
  fds_gray_20: '#DADDE1',
  fds_gray_25: '#CCD0D5',
  fds_gray_30: '#BEC3C9',
  fds_gray_45: '#8D949E',
  fds_gray_70: '#606770',
  fds_gray_80: '#444950',
  fds_gray_90: '#303338',
  fds_gray_100: '#1C1E21',
  fds_green_55: '#00A400',
  fds_highlight: '#3578E5',
  fds_highlight_cell_background: '#ECF3FF',
  fds_primary_icon: '#1C1E21',
  fds_primary_text: '#1C1E21',
  fds_red_55: '#FA383E',
  fds_spectrum_aluminum_tint_70: '#E4F0F6',
  fds_spectrum_blue_gray_tint_70: '#CFD1D5',
  fds_spectrum_cherry: '#F35369',
  fds_spectrum_cherry_tint_70: '#FBCCD2',
  fds_spectrum_grape_tint_70: '#DDD5F0',
  fds_spectrum_grape_tint_90: '#F4F1FA',
  fds_spectrum_lemon_dark_1: '#F5C33B',
  fds_spectrum_lemon_tint_70: '#FEF2D1',
  fds_spectrum_lime: '#A3CE71',
  fds_spectrum_lime_tint_70: '#E4F0D5',
  fds_spectrum_orange_tint_70: '#FCDEC5',
  fds_spectrum_orange_tint_90: '#FEF4EC',
  fds_spectrum_seafoam_tint_70: '#CAEEF9',
  fds_spectrum_slate_dark_2: '#89A1AC',
  fds_spectrum_slate_tint_70: '#EAEFF2',
  fds_spectrum_teal: '#6BCEBB',
  fds_spectrum_teal_dark_1: '#4DBBA6',
  fds_spectrum_teal_dark_2: '#31A38D',
  fds_spectrum_teal_tint_70: '#D2F0EA',
  fds_spectrum_teal_tint_90: '#F0FAF8',
  fds_spectrum_tomato: '#FB724B',
  fds_spectrum_tomato_tint_30: '#F38E7B',
  fds_spectrum_tomato_tint_90: '#FDEFED',
  fds_white: '#FFFFFF',
  fds_white_alpha_05: 'rgba(255, 255, 255, 0.05)',
  fds_white_alpha_10: 'rgba(255, 255, 255, 0.1)',
  fds_white_alpha_20: 'rgba(255, 255, 255, 0.2)',
  fds_white_alpha_30: 'rgba(255, 255, 255, 0.3)',
  fds_white_alpha_40: 'rgba(255, 255, 255, 0.4)',
  fds_white_alpha_50: 'rgba(255, 255, 255, 0.5)',
  fds_white_alpha_60: 'rgba(255, 255, 255, 0.6)',
  fds_white_alpha_80: 'rgba(255, 255, 255, 0.8)',
  fds_yellow_20: '#FFBA00',
  always_white: '#FFFFFF',
  always_black: 'black',
  always_dark_overlay: 'rgba(0, 0, 0, 0.4)',
  always_light_overlay: 'rgba(255, 255, 255, 0.4)',
  always_gray_40: '#65676B',
  always_gray_75: '#BCC0C4',
  always_gray_95: '#F0F2F5',
  attachment_footer_background: '#F0F2F5',
  background_deemphasized: '#F0F2F5',
  base_blue: '#1877F2',
  base_cherry: '#F3425F',
  base_grape: '#9360F7',
  base_lemon: '#F7B928',
  base_lime: '#45BD62',
  base_pink: '#FF66BF',
  base_seafoam: '#54C7EC',
  base_teal: '#2ABBA7',
  base_tomato: '#FB724B',
  blue_link: '#216FDB',
  card_background: '#FFFFFF',
  card_background_flat: '#F7F8FA',
  comment_background: '#F0F2F5',
  comment_footer_background: '#F6F9FA',
  dataviz_primary_1: 'rgb(48,200,180)',
  disabled_button_background: '#E4E6EB',
  disabled_button_text: '#BCC0C4',
  disabled_icon: '#BCC0C4',
  disabled_text: '#BCC0C4',
  divider: '#CED0D4',
  event_date: '#F3425F',
  fb_wordmark: '#1877F2',
  glimmer_spinner_icon: '#65676B',
  hero_banner_background: '#FFFFFF',
  hosted_view_selected_state: 'rgba(45, 136, 255, 0.1)',
  highlight_bg: '#E7F3FF',
  hover_overlay: 'rgba(0, 0, 0, 0.05)',
  media_hover: 'rgba(68, 73, 80, 0.15)',
  media_inner_border: 'rgba(0, 0, 0, 0.1)',
  media_outer_border: '#FFFFFF',
  media_pressed: 'rgba(68, 73, 80, 0.35)',
  messenger_card_background: '#FFFFFF',
  messenger_reply_background: '#F0F2F5',
  overlay_alpha_80: 'rgba(244, 244, 244, 0.8)',
  overlay_on_media: 'rgba(0, 0, 0, 0.6)',
  nav_bar_background: '#FFFFFF',
  new_notification_background: '#E7F3FF',
  non_media_pressed: 'rgba(68, 73, 80, 0.15)',
  non_media_pressed_on_dark: 'rgba(255, 255, 255, 0.3)',
  notification_badge: '#e41e3f',
  placeholder_icon: '#8A8D91',
  placeholder_image: 'rgb(164, 167, 171)',
  placeholder_text: '#8A8D91',
  placeholder_text_on_media: 'rgba(255, 255, 255, 0.5)',
  popover_background: '#FFFFFF',
  positive: '#31A24C',
  positive_background: '#DEEFE1',
  press_overlay: 'rgba(0, 0, 0, 0.10)',
  primary_button_background: '#1B74E4',
  primary_button_pressed: '#77A7FF',
  primary_button_text: '#FFFFFF',
  primary_deemphasized_button_background: '#E7F3FF',
  primary_deemphasized_button_pressed: 'rgba(0, 0, 0, 0.05)',
  primary_deemphasized_button_pressed_overlay: 'rgba(25, 110, 255, 0.15)',
  primary_deemphasized_button_text: '#1877F2',
  primary_icon: '#050505',
  primary_text: '#050505',
  primary_text_on_media: '#FFFFFF',
  primary_web_focus_indicator: '#D24294',
  progress_ring_neutral_background: 'rgba(0, 0, 0, 0.2)',
  progress_ring_neutral_foreground: '#000000',
  progress_ring_on_media_background: 'rgba(255, 255, 255, 0.2)',
  progress_ring_on_media_foreground: '#FFFFFF',
  progress_ring_blue_background: 'rgba(24, 119, 242, 0.2)',
  progress_ring_blue_foreground: 'hsl(214, 89%, 52%)',
  progress_ring_disabled_background: 'rgba(190,195,201, 0.2)',
  progress_ring_disabled_foreground: '#BEC3C9',
  rating_star_active: '#EB660D',
  scroll_thumb: '#BCC0C4',
  secondary_button_background: '#E4E6EB',
  secondary_button_background_floating: '#ffffff',
  secondary_button_background_on_dark: 'rgba(0, 0, 0, 0.4)',
  secondary_button_pressed: 'rgba(0, 0, 0, 0.05)',
  secondary_button_stroke: 'transparent',
  secondary_button_text: '#050505',
  secondary_icon: '#65676B',
  secondary_text: '#65676B',
  secondary_text_on_media: 'rgba(255, 255, 255, 0.9)',
  section_header_text: '#4B4C4F',
  shadow_1: 'rgba(0, 0, 0, 0.1)',
  shadow_2: 'rgba(0, 0, 0, 0.2)',
  shadow_5: 'rgba(0, 0, 0, 0.5)',
  shadow_8: 'rgba(0, 0, 0, 0.8)',
  shadow_inset: 'rgba(255, 255, 255, 0.5)',
  surface_background: '#FFFFFF',
  text_highlight: 'rgba(24, 119, 242, 0.2)',
  toggle_active_background: '#E7F3FF',
  toggle_active_icon: 'rgb(24, 119, 242)',
  toggle_active_text: 'rgb(24, 119, 242)',
  toggle_button_active_background: '#E7F3FF',
  wash: '#C9CCD1', //?? '#E4E6EB',
  web_wash: '#F0F2F5',
  fb_logo_color: '#2D88FF',
  dataviz_primary_2: 'rgb(134,218,255)',
  dataviz_primary_3: 'rgb(95,170,255)',
  dataviz_secondary_1: 'rgb(118,62,230)',
  dataviz_secondary_2: 'rgb(147,96,247)',
  dataviz_secondary_3: 'rgb(219,26,139)',
  dataviz_supplementary_1: 'rgb(255,122,105)',
  dataviz_supplementary_2: 'rgb(241,168,23)',
  dataviz_supplementary_3: 'rgb(49,162,76)',
  dataviz_supplementary_4: 'rgb(50,52,54)',
};

export const FontWeights = {
  thin: '100',
  light: '200',
  regular: '300',
  medium: '400',
  semiBold: '500',
  bold: '600',
  heavy: '700',
  black: '800',
  extraBlack: '900',
};

export const Spacing = {
  XXS: 2,
  XS: 4,
  S: 8,
  M: 12,
  L: 16,
  XL: 24,
};

export const Radius = {
  XXS: 2,
  XS: 4,
  S: 8,
  M: 12,
  L: 16,
  XL: 24,
};

export const Sizes = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

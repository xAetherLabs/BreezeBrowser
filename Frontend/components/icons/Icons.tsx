import React from 'react';
import { Image } from 'react-native';
import Svg, { Circle, G, Line, LinearGradient, Path, Polyline, Rect, Stop } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';
import { ImageProps } from 'react-native';
import pfd from '../../assets/images/pdf.png'
import svg from '../../assets/images/svg.png'
import mp3 from '../../assets/images/mp3.png'
import mp4 from '../../assets/images/mp4.png'
import png from '../../assets/images/png.png'
import file from '../../assets/images/file.png'
import code from '../../assets/images/code.png'
import html from '../../assets/images/html.png'
import solana from '../../assets/images/solana.png'
import favicon from '../../assets/images/favico.png'

export const PlusIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
  <Path d="M6 12H18M12 6V18" strokeWidth={2.4}
  strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
  );
};

export const CancelIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg fill="#000000" height="200px" width="200px"
  viewBox="0 0 512 512" enable-background="new 0 0 512 512" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M358.625,313.375 c12.5,12.492,12.5,32.758,0,45.25C352.383,364.875,344.188,368,336,368s-16.383-3.125-22.625-9.375L256,301.25l-57.375,57.375 C192.383,364.875,184.188,368,176,368s-16.383-3.125-22.625-9.375c-12.5-12.492-12.5-32.758,0-45.25L210.75,256l-57.375-57.375 c-12.5-12.492-12.5-32.758,0-45.25c12.484-12.5,32.766-12.5,45.25,0L256,210.75l57.375-57.375c12.484-12.5,32.766-12.5,45.25,0 c12.5,12.492,12.5,32.758,0,45.25L301.25,256L358.625,313.375z"></Path>
  </G></Svg>
  );
};

export const PrivateArrowUpIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#000000" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#ffffff" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const ArrowUpIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#000000" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#000000" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const ArrowDownIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#000000" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#000000" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const ArrowLeftIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#ffffff" style={{transform:[{rotate:'-90deg'}]}} {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#ffffff" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const ArrowRightIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#ffffff" style={{transform:[{rotate:'90deg'}]}} {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#ffffff" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const ArrowLeftDarkIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#000000" style={{transform:[{rotate:'-90deg'}]}} {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#000000" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const ArrowRightDarkIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 1024 1024" fill="#000000" style={{transform:[{rotate:'90deg'}]}} {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier">
  <Path fill="#000000" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z">
  </Path></G></Svg>
  );
};

export const SettingIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
  <G id="SVGRepo_iconCarrier"><G id="Interface / Settings"><G id="Vector">
  <Path d="M20.3499 8.92293L19.9837 8.7192C19.9269 8.68756 19.8989 8.67169 19.8714 8.65524C19.5983 8.49165 19.3682 8.26564 19.2002 7.99523C19.1833 7.96802 19.1674 7.93949 19.1348 7.8831C19.1023 7.82677 19.0858 7.79823 19.0706 7.76998C18.92 7.48866 18.8385 7.17515 18.8336 6.85606C18.8331 6.82398 18.8332 6.79121 18.8343 6.72604L18.8415 6.30078C18.8529 5.62025 18.8587 5.27894 18.763 4.97262C18.6781 4.70053 18.536 4.44993 18.3462 4.23725C18.1317 3.99685 17.8347 3.82534 17.2402 3.48276L16.7464 3.1982C16.1536 2.85658 15.8571 2.68571 15.5423 2.62057C15.2639 2.56294 14.9765 2.56561 14.6991 2.62789C14.3859 2.69819 14.0931 2.87351 13.5079 3.22396L13.5045 3.22555L13.1507 3.43741C13.0948 3.47091 13.0665 3.48779 13.0384 3.50338C12.7601 3.6581 12.4495 3.74365 12.1312 3.75387C12.0992 3.7549 12.0665 3.7549 12.0013 3.7549C11.9365 3.7549 11.9024 3.7549 11.8704 3.75387C11.5515 3.74361 11.2402 3.65759 10.9615 3.50224C10.9334 3.48658 10.9056 3.46956 10.8496 3.4359L10.4935 3.22213C9.90422 2.86836 9.60915 2.69121 9.29427 2.62057C9.0157 2.55807 8.72737 2.55634 8.44791 2.61471C8.13236 2.68062 7.83577 2.85276 7.24258 3.19703L7.23994 3.1982L6.75228 3.48124L6.74688 3.48454C6.15904 3.82572 5.86441 3.99672 5.6517 4.23614C5.46294 4.4486 5.32185 4.69881 5.2374 4.97018C5.14194 5.27691 5.14703 5.61896 5.15853 6.3027L5.16568 6.72736C5.16676 6.79166 5.16864 6.82362 5.16817 6.85525C5.16343 7.17499 5.08086 7.48914 4.92974 7.77096C4.9148 7.79883 4.8987 7.8267 4.86654 7.88237C4.83436 7.93809 4.81877 7.96579 4.80209 7.99268C4.63336 8.26452 4.40214 8.49186 4.12733 8.65572C4.10015 8.67193 4.0715 8.68752 4.01521 8.71871L3.65365 8.91908C3.05208 9.25245 2.75137 9.41928 2.53256 9.65669C2.33898 9.86672 2.19275 10.1158 2.10349 10.3872C2.00259 10.6939 2.00267 11.0378 2.00424 11.7255L2.00551 12.2877C2.00706 12.9708 2.00919 13.3122 2.11032 13.6168C2.19979 13.8863 2.34495 14.134 2.53744 14.3427C2.75502 14.5787 3.05274 14.7445 3.64974 15.0766L4.00808 15.276C4.06907 15.3099 4.09976 15.3266 4.12917 15.3444C4.40148 15.5083 4.63089 15.735 4.79818 16.0053C4.81625 16.0345 4.8336 16.0648 4.8683 16.1255C4.90256 16.1853 4.92009 16.2152 4.93594 16.2452C5.08261 16.5229 5.16114 16.8315 5.16649 17.1455C5.16707 17.1794 5.16658 17.2137 5.16541 17.2827L5.15853 17.6902C5.14695 18.3763 5.1419 18.7197 5.23792 19.0273C5.32287 19.2994 5.46484 19.55 5.65463 19.7627C5.86915 20.0031 6.16655 20.1745 6.76107 20.5171L7.25478 20.8015C7.84763 21.1432 8.14395 21.3138 8.45869 21.379C8.73714 21.4366 9.02464 21.4344 9.30209 21.3721C9.61567 21.3017 9.90948 21.1258 10.4964 20.7743L10.8502 20.5625C10.9062 20.5289 10.9346 20.5121 10.9626 20.4965C11.2409 20.3418 11.5512 20.2558 11.8695 20.2456C11.9015 20.2446 11.9342 20.2446 11.9994 20.2446C12.0648 20.2446 12.0974 20.2446 12.1295 20.2456C12.4484 20.2559 12.7607 20.3422 13.0394 20.4975C13.0639 20.5112 13.0885 20.526 13.1316 20.5519L13.5078 20.7777C14.0971 21.1315 14.3916 21.3081 14.7065 21.3788C14.985 21.4413 15.2736 21.4438 15.5531 21.3855C15.8685 21.3196 16.1657 21.1471 16.7586 20.803L17.2536 20.5157C17.8418 20.1743 18.1367 20.0031 18.3495 19.7636C18.5383 19.5512 18.6796 19.3011 18.764 19.0297C18.8588 18.7252 18.8531 18.3858 18.8417 17.7119L18.8343 17.2724C18.8332 17.2081 18.8331 17.1761 18.8336 17.1445C18.8383 16.8247 18.9195 16.5104 19.0706 16.2286C19.0856 16.2007 19.1018 16.1726 19.1338 16.1171C19.166 16.0615 19.1827 16.0337 19.1994 16.0068C19.3681 15.7349 19.5995 15.5074 19.8744 15.3435C19.9012 15.3275 19.9289 15.3122 19.9838 15.2818L19.9857 15.2809L20.3472 15.0805C20.9488 14.7472 21.2501 14.5801 21.4689 14.3427C21.6625 14.1327 21.8085 13.8839 21.8978 13.6126C21.9981 13.3077 21.9973 12.9658 21.9958 12.2861L21.9945 11.7119C21.9929 11.0287 21.9921 10.6874 21.891 10.3828C21.8015 10.1133 21.6555 9.86561 21.463 9.65685C21.2457 9.42111 20.9475 9.25526 20.3517 8.92378L20.3499 8.92293Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path><Path d="M8.00033 12C8.00033 14.2091 9.79119 16 12.0003 16C14.2095 16 16.0003 14.2091 16.0003 12C16.0003 9.79082 14.2095 7.99996 12.0003 7.99996C9.79119 7.99996 8.00033 9.79082 8.00033 12Z" stroke="#000000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
  </Path></G></G></G></Svg>
  );
};

export const CrossIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg fill="#000000" height="200px" width="200px" viewBox="0 0 47.095 47.095" {...props}>
  <G>
  <Path d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21 
  L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831 
  c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0 
  C47.673,42.282,47.672,38.54,45.363,36.234z" />
  </G>
  </Svg>
  )
};


export const DotIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 32 32" fill="#ffffff" stroke="#ffffff" width="20" height="20" {...props}>
  <G>
  <Path d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z" />
  <Path d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z" />
  <Path d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z" />
  </G>
  </Svg>
  );
};

export const TabIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg width="64" height="64" viewBox="0 0 64 64" {...props}>
  <Rect x="20" y="14" width="24" height="16" rx="3" stroke="#ffffff" strokeWidth="3" fill="none"/>
  <Rect x="16" y="36" width="32" height="4" rx="2" fill="#ffffff"/>
  <Rect x="16" y="44" width="20" height="4" rx="2" fill="#ffffff"/>
  </Svg>
  );
};

export const TabIconDark: React.FC<SvgProps> = (props) => {
  return (
  <Svg width="64" height="64" viewBox="0 0 64 64" {...props}>
  <Rect x="20" y="14" width="26" height="16" rx="3" stroke="#000000" strokeWidth="3.5" fill="none"/>
  <Rect x="20" y="38" width="27" height="0.5" rx="3" stroke="#000000" strokeWidth="3.5" fill="none"/>
  <Rect x="20" y="46" width="20" height="0.5" rx="3" stroke="#000000" strokeWidth="3.5" fill="none"/>
  </Svg>
  );
};

export const RefreshIcon: React.FC<SvgProps> = (props) => {
  return (
 <Svg viewBox="0 0 24 24" fill="none" {...props}>
 <Path
 d="M12.793 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L14.086 7H12.5C8.952 7 6 9.952 6 13.5S8.952 20 12.5 20s6.5-2.952 6.5-6.5a1 1 0 1 1 2 0c0 4.652-3.848 8.5-8.5 8.5S4 18.152 4 13.5 7.848 5 12.5 5h1.586l-1.293-1.293a1 1 0 0 1 0-1.414z"
 fill="#0D0D0D"/>
 </Svg>
  );
};

export const LockAltIcon: React.FC<SvgProps> = (props) => {
  return (
 <Svg viewBox="0 0 24 24" fill="none" {...props}>
 <Path
 d="M17,11H7a1,1,0,0,1-1-1V8A6,6,0,0,1,18,8v2A1,1,0,0,1,17,11ZM8,9h8V8A4,4,0,0,0,8,8Z"
 fill="#000000"/>
 <Path
 d="M18,9H6a2,2,0,0,0-2,2v3a8,8,0,0,0,8,8h.24A8.21,8.21,0,0,0,20,13.71V11A2,2,0,0,0,18,9Z"
 fill="#000000"/>
 <Path
 d="M13.5,15A1.5,1.5,0,1,0,11,16.11V17a1,1,0,0,0,2,0v-.89A1.5,1.5,0,0,0,13.5,15Z"
 fill="#000000"/>
 </Svg>
  );
};

export const BookIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"/>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
  <G id="SVGRepo_iconCarrier">
  <Path d="M12 6V19" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <Path d="M21 6L21 19" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <Path d="M3 6L3 19" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <Path d="M21 19C21 19 20 17 16.5 17C13 17 12 19 12 19" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <Path d="M12 19C12 19 11 17 7.5 17C4 17 3 19 3 19" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <Path d="M21 6C21 6 20 4 16.5 4C13 4 12 6 12 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <Path d="M12 6C12 6 11 4 7.5 4C4 4 3 6 3 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/></G>
  </Svg>
  );
};

export const ShareIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 21 21" fill="#000000" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"/>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.764">
  <G fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)">
  <Path d="m8.5 2.5-1.978-2-2.022 2"/><Path d="m6.5.5v9"/>
  <Path d="m3.5 4.5h-1c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-1"/></G></G>
  <G id="SVGRepo_iconCarrier"><G fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)">
  <Path d="m8.5 2.5-1.978-2-2.022 2"/><Path d="m6.5.5v9"/>
  <Path d="m3.5 4.5h-1c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-1"/></G></G>
  </Svg>
  );
};

export const ShareArticleIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 21 21" fill="#ffffff" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"/>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.764">
  <G fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)">
  <Path d="m8.5 2.5-1.978-2-2.022 2"/><Path d="m6.5.5v9"/>
  <Path d="m3.5 4.5h-1c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-1"/></G></G>
  <G id="SVGRepo_iconCarrier"><G fill="none" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)">
  <Path d="m8.5 2.5-1.978-2-2.022 2"/><Path d="m6.5.5v9"/>
  <Path d="m3.5 4.5h-1c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-1"/></G></G>
  </Svg>
  );
};

export const GoogleIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="-0.5 0 48 48" width={48} height={48} {...props}>
  <G fill="none" fillRule="evenodd">
  <Path
  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
  fill="#FBBC05"/>
  <Path
  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
  fill="#EB4335"/>
  <Path
  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
  fill="#34A853"/>
  <Path
  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
  fill="#4285F4"/>
  </G>
  </Svg>
  );
};

export const BookerIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier"
  stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
  <Path d="M19 3.25001H6.75C6.10713 3.23114 5.483 3.4679 5.01439 3.9084C4.54577 4.3489 4.2709 4.9572 4.25 5.60001V18C4.27609 18.7542 4.60027 19.4673 5.15142 19.9829C5.70258 20.4984 6.43571 20.7743 7.19 20.75H19C19.1981 20.7474 19.3874 20.6676 19.5275 20.5275C19.6676 20.3874 19.7474 20.1981 19.75 20V4.00001C19.7474 3.8019 19.6676 3.61264 19.5275 3.47254C19.3874 3.33245 19.1981 3.2526 19 3.25001ZM18.25 19.25H7.19C6.83339 19.2748 6.48151 19.1571 6.21156 18.9227C5.94161 18.6884 5.77562 18.3566 5.75 18C5.77562 17.6435 5.94161 17.3116 6.21156 17.0773C6.48151 16.843 6.83339 16.7253 7.19 16.75H18.25V19.25ZM18.25 15.25H7.19C6.68656 15.2506 6.19135 15.3778 5.75 15.62V5.60001C5.7729 5.3559 5.89028 5.13039 6.0771 4.9716C6.26392 4.8128 6.50538 4.73329 6.75 4.75001H18.25V15.25Z" fill="#ffffff"></Path>
  <Path d="M8.75 8.75H15.25C15.4489 8.75 15.6397 8.67098 15.7803 8.53033C15.921 8.38968 16 8.19891 16 8C16 7.80109 15.921 7.61032 15.7803 7.46967C15.6397 7.32902 15.4489 7.25 15.25 7.25H8.75C8.55109 7.25 8.36032 7.32902 8.21967 7.46967C8.07902 7.61032 8 7.80109 8 8C8 8.19891 8.07902 8.38968 8.21967 8.53033C8.36032 8.67098 8.55109 8.75 8.75 8.75Z" fill="#ffffff"></Path>
  <Path d="M8.75 12.25H15.25C15.4489 12.25 15.6397 12.171 15.7803 12.0303C15.921 11.8897 16 11.6989 16 11.5C16 11.3011 15.921 11.1103 15.7803 10.9697C15.6397 10.829 15.4489 10.75 15.25 10.75H8.75C8.55109 10.75 8.36032 10.829 8.21967 10.9697C8.07902 11.1103 8 11.3011 8 11.5C8 11.6989 8.07902 11.8897 8.21967 12.0303C8.36032 12.171 8.55109 12.25 8.75 12.25Z" fill="#ffffff">
  </Path></G></Svg>
  );
};

export const AuxingIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.176" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier"
  stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
  <Path d="M13.1807 11.8606C12.7807 11.8606 12.4207 11.6406 12.2507 11.2806L10.8007 8.39058L10.3807 9.17058C10.1507 9.60058 9.6907 9.87058 9.2007 9.87058H8.4707C8.0607 9.87058 7.7207 9.53058 7.7207 9.12058C7.7207 8.71058 8.0607 8.37058 8.4707 8.37058H9.1107L9.9007 6.91058C10.0907 6.57058 10.4707 6.34058 10.8307 6.36058C11.2207 6.36058 11.5707 6.59058 11.7507 6.93058L13.1807 9.79058L13.5207 9.10058C13.7507 8.64058 14.2007 8.36058 14.7207 8.36058H15.5307C15.9407 8.36058 16.2807 8.70058 16.2807 9.11058C16.2807 9.52058 15.9407 9.86058 15.5307 9.86058H14.8207L14.1107 11.2706C13.9307 11.6406 13.5807 11.8606 13.1807 11.8606Z" fill="#000000">
  </Path><Path d="M2.74982 18.6508C2.33982 18.6508 1.99982 18.3108 1.99982 17.9008V12.2008C1.94982 9.49078 2.95982 6.93078 4.83982 5.01078C6.71982 3.10078 9.23982 2.05078 11.9498 2.05078C17.4898 2.05078 21.9998 6.56078 21.9998 12.1008V17.8008C21.9998 18.2108 21.6598 18.5508 21.2498 18.5508C20.8398 18.5508 20.4998 18.2108 20.4998 17.8008V12.1008C20.4998 7.39078 16.6698 3.55078 11.9498 3.55078C9.63982 3.55078 7.49982 4.44078 5.90982 6.06078C4.30982 7.69078 3.45982 9.86078 3.49982 12.1808V17.8908C3.49982 18.3108 3.16982 18.6508 2.74982 18.6508Z" fill="#000000">
  </Path><Path d="M5.94 12.4492H5.81C3.71 12.4492 2 14.1592 2 16.2592V18.1392C2 20.2392 3.71 21.9492 5.81 21.9492H5.94C8.04 21.9492 9.75 20.2392 9.75 18.1392V16.2592C9.75 14.1592 8.04 12.4492 5.94 12.4492Z" fill="#000000">
  </Path><Path d="M18.19 12.4492H18.06C15.96 12.4492 14.25 14.1592 14.25 16.2592V18.1392C14.25 20.2392 15.96 21.9492 18.06 21.9492H18.19C20.29 21.9492 22 20.2392 22 18.1392V16.2592C22 14.1592 20.29 12.4492 18.19 12.4492Z" fill="#000000">
  </Path></G></Svg>
  );
};

export const FindIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
  <Circle cx="17.5" cy="17.5" r="2.5" stroke="#000000" stroke-width="99"></Circle>
  <Path d="M21 21L19.5 19.5" stroke="#000000" stroke-width="99" stroke-linecap="round"></Path>
  <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V13.1689C19.2646 12.7435 18.4107 12.5 17.5 12.5C14.7386 12.5 12.5 14.7386 12.5 17.5C12.5 19.4428 13.6081 21.1269 15.2268 21.9546C14.337 22 13.2765 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10ZM8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7H12C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5H8ZM8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11H14C14.5523 11 15 10.5523 15 10C15 9.44772 14.5523 9 14 9L8 9ZM8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13H8Z" fill="#000000">
  </Path></G></Svg>
  );
};

export const DesktopIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
  <G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier"
  stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
  <G id="System / Desktop"><Path id="Vector" d="M15 20H9M7.19691 17C6.07899 17 5.5192 17 5.0918 16.7822C4.71547 16.5905 4.40973 16.2837 4.21799 15.9074C4.09698 15.6699 4.04315 15.3919 4.0192 15M7.19691 17H16.8031M7.19691 17H5.59961C5.03956 17 4.75981 16.9996 4.5459 16.8906C4.35774 16.7948 4.20487 16.6429 4.10899 16.4548C4 16.2409 4 15.9601 4 15.4V15H4.0192M4.0192 15C4 14.6859 4 14.2985 4 13.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V13.8031C20 14.3 20 14.6864 19.9809 15M4.0192 15H19.9809M19.9809 15C19.957 15.3919 19.9032 15.67 19.7822 15.9074C19.5905 16.2837 19.2837 16.5905 18.9074 16.7822C18.48 17 17.921 17 16.8031 17M19.9809 15H20V15.4C20 15.9601 19.9996 16.2409 19.8906 16.4548C19.7948 16.6429 19.6423 16.7948 19.4542 16.8906C19.2403 16.9996 18.9597 17 18.3996 17H16.8031" stroke="#000000" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round">
  </Path></G></G></Svg>
  );
};

export const DownloadIcon: React.FC<SvgProps> = (props) => {
  return (
  <Svg viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="0.528" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
  <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier"><Path fill-rule="evenodd"
  clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z" fill="#000000">
  </Path></G></Svg>
  );
};

export const DeviceIcon: React.FC<SvgProps> = (props) => {
 return(
 <Svg viewBox="0 0 24 24" fill="none" {...props}>
 <G id="SVGRepo_iconCarrier">
 <Path
 d="M2 14.5C2 13.0955 2 12.3933 2.33706 11.8889C2.48298 11.6705 2.67048 11.483 2.88886 11.3371C3.39331 11 4.09554 11 5.5 11C6.90446 11 7.60669 11 8.11114 11.3371C8.32952 11.483 8.51702 11.6705 8.66294 11.8889C9 12.3933 9 13.0955 9 14.5V18.5C9 19.9045 9 20.6067 8.66294 21.1111C8.51702 21.3295 8.32952 21.517 8.11114 21.6629C7.60669 22 6.90446 22 5.5 22C4.09554 22 3.39331 22 2.88886 21.6629C2.67048 21.517 2.48298 21.3295 2.33706 21.1111C2 20.6067 2 19.9045 2 18.5V14.5Z"
 fill={'#ffffff'}
 />
 <Path
 fillRule="evenodd"
 clipRule="evenodd"
 d="M22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22C12.3009 22 10.9846 22 9.94386 21.8929C10.2787 21.368 10.3977 20.8107 10.4502 20.2949C10.5001 19.8039 10.5001 19.2114 10.5 18.566L10.5 18.5V14.5L10.5 14.434C10.5001 13.7886 10.5001 13.1961 10.4502 12.7051C10.396 12.1723 10.2708 11.5953 9.91014 11.0555C9.65479 10.6733 9.32666 10.3452 8.9445 10.0899C8.40473 9.72919 7.82766 9.60403 7.29488 9.54983C6.91621 9.51131 6.47721 9.50253 6.00011 9.50056C6.00239 6.05993 6.0529 4.29024 7.17157 3.17157C8.34315 2 10.2288 2 14 2C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10ZM11.25 19C11.25 18.5858 11.5858 18.25 12 18.25H17C17.4142 18.25 17.75 18.5858 17.75 19C17.75 19.4142 17.4142 19.75 17 19.75H12C11.5858 19.75 11.25 19.4142 11.25 19Z"
 fill={'#ffffff'}
 />
 </G>
 </Svg>
)}

export const ThemeIcon: React.FC<SvgProps> = (props) => {
 return(
<Svg viewBox="0 0 48 48" fill="#ffffff" stroke="#ffffff" {...props}>
<G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier" stroke-linecap="round"
stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier"><G id="Layer_2" data-name="Layer 2"><G id="Icons">
<G><Rect width="48" height="48" fill="none"></Rect><G><Path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z">
</Path><Path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"></Path>
</G></G></G></G></G></Svg>
)}

export const SwitchIcon: React.FC<SvgProps> = (props) => {
 return(
<Svg fill="#ffffff" viewBox="0 0 24 24" id="switch-double" stroke="#ffffff" {...props}>
<G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
</G><G id="SVGRepo_iconCarrier"><Path d="M12,6.5A5.37,5.37,0,0,0,13.26,10H5.5a3.5,3.5,0,1,1,0-7h7.77A5.4,5.4,0,0,0,12,6.5Z">
</Path><Path d="M22,17.5A3.48,3.48,0,0,1,18.5,21H10.73A5.4,5.4,0,0,0,12,17.5,5.45,5.45,0,0,0,10.73,14H18.5A3.5,3.5,0,0,1,22,17.5Z">
</Path><Path d="M22,6.07A4.5,4.5,0,0,0,17.5,2,4.52,4.52,0,0,0,13,6.5a4.4,4.4,0,0,0,1.36,3.21A4.45,4.45,0,0,0,17.5,11,4.5,4.5,0,0,0,22,6.93a2.08,2.08,0,0,0,0-.43A2.08,2.08,0,0,0,22,6.07Z">
</Path><Path d="M6.5,13A4.5,4.5,0,0,0,2,17.07a3.1,3.1,0,0,0,0,.86A4.5,4.5,0,0,0,6.5,22a4.44,4.44,0,0,0,3.13-1.28A4.4,4.4,0,0,0,11,17.5,4.52,4.52,0,0,0,6.5,13Z"></Path></G></Svg>
)}

export const LeafIcon: React.FC<SvgProps> = (props) => {
 return(
<Svg viewBox="0 0 24 24" fill="none" {...props}>
<G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier"
stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
<Path d="M13.47 7.41158L15.93 6.20158C16.23 6.05158 16.31 5.66158 16.08 5.42158C15.19 4.44158 14.29 3.62158 13.57 3.00158C13.24 2.72158 12.75 2.95158 12.75 3.38158V6.96158C12.75 7.33158 13.14 7.57158 13.47 7.41158Z" fill="#292D32">
</Path><Path d="M12.75 19.7384V21.3884C12.75 21.6884 13.02 21.9384 13.32 21.8884C16.05 21.4384 18.33 19.6084 19.41 17.1484C19.6 16.7284 19.14 16.3084 18.72 16.5084L13.03 19.2984C12.86 19.3784 12.75 19.5484 12.75 19.7384Z" fill="#292D32">
</Path><Path d="M11.2505 3.36159C11.2505 2.93159 10.7605 2.70159 10.4305 2.97159C8.07046 4.95159 3.88046 9.12158 3.90046 13.9016C3.90046 17.9216 6.84046 21.2516 10.6805 21.8916C10.9805 21.9416 11.2505 21.6916 11.2505 21.3916V3.36159Z" fill="#292D32">
</Path><Path d="M13.4402 12.4714L18.7302 10.2514C19.0002 10.1314 19.1302 9.82141 19.0002 9.56141C18.6302 8.83141 18.2002 8.12141 17.7302 7.46141C17.5902 7.26141 17.3302 7.20141 17.1102 7.30141L13.0202 9.29141C12.8502 9.37141 12.7402 9.55141 12.7402 9.74141V12.0114C12.7502 12.3614 13.1102 12.6114 13.4402 12.4714Z" fill="#292D32">
</Path><Path d="M19.83 14.3107C19.99 14.2307 20.09 14.0807 20.09 13.9107C20.09 13.2707 20.01 12.6407 19.87 12.0207C19.8 11.7207 19.47 11.5607 19.19 11.6807L13.05 14.3007C12.87 14.3807 12.75 14.5607 12.75 14.7607V16.9607C12.75 17.3307 13.14 17.5707 13.47 17.4107L19.37 14.5407L19.83 14.3107Z" fill="#292D32">
</Path></G></Svg>
)}

export const CheckIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="none" {...props}><G id="SVGRepo_bgCarrier" stroke-width="3" stroke={'red'}>
</G><G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#ffffff">
</Path></G></Svg>
)}

export const HomeIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="none" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0">
</G><G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
<Path d="M21 17.8109V10.8663C21 9.88216 20.5726 8.95316 19.8418 8.34896L14.4558 3.89571C13.0113 2.70143 10.9887 2.70143 9.54424 3.89571L4.15818 8.34896C3.42742 8.95316 3 9.88216 3 10.8663V17.8109C3 19.5722 4.34315 21 6 21H8C8.55228 21 9 20.5523 9 20V16.7478C9 14.9865 10.3431 13.5587 12 13.5587C13.6569 13.5587 15 14.9865 15 16.7478V20C15 20.5523 15.4477 21 16 21H18C19.6569 21 21 19.5722 21 17.8109Z" stroke="#ffffff" stroke-width="2">
</Path></G></Svg>
)}

export const AppsIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="#000000" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
<G id="SVGRepo_iconCarrier"><G id="🔍-Product-Icons" stroke="none" stroke-width="1"
fill="none" fill-rule="evenodd"><G id="ic_fluent_apps_add_in_24_filled" fill="#ffffff" fill-rule="nonzero">
<Path d="M10.5,3 C11.8807119,3 13,4.11928813 13,5.5 L13,11 L18.5,11 C19.8807119,11 21,12.1192881 21,13.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L10.5,3 Z M11,13 L5,13 L5,18.5 C5,18.7761424 5.22385763,19 5.5,19 L11,19 L11,13 Z M18.5,13 L13,13 L13,19 L18.5,19 C18.7761424,19 19,18.7761424 19,18.5 L19,13.5 C19,13.2238576 18.7761424,13 18.5,13 Z M10.5,5 L5.5,5 C5.22385763,5 5,5.22385763 5,5.5 L5,11 L11,11 L11,5.5 C11,5.22385763 10.7761424,5 10.5,5 Z M17.8833789,2.00672773 L18,2 C18.5128358,2 18.9355072,2.38604019 18.9932723,2.88337887 L19,3 L19,5 L21,5 C21.5128358,5 21.9355072,5.38604019 21.9932723,5.88337887 L22,6 C22,6.51283584 21.6139598,6.93550716 21.1166211,6.99327227 L21,7 L19,7 L19,9 C19,9.51283584 18.6139598,9.93550716 18.1166211,9.99327227 L18,10 C17.4871642,10 17.0644928,9.61395981 17.0067277,9.11662113 L17,9 L17,7 L15,7 C14.4871642,7 14.0644928,6.61395981 14.0067277,6.11662113 L14,6 C14,5.48716416 14.3860402,5.06449284 14.8833789,5.00672773 L15,5 L17,5 L17,3 C17,2.48716416 17.3860402,2.06449284 17.8833789,2.00672773 L18,2 L17.8833789,2.00672773 Z" id="🎨-Color">
</Path></G></G></G></Svg>
)}

export const SearchIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="none" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
<Path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" stroke-width="2.232" stroke-linecap="round" stroke-linejoin="round">
</Path></G></Svg>
)}

export const WalletIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="none" {...props}><G id="SVGRepo_bgCars qqrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
</G><G id="SVGRepo_iconCarrier"><Path d="M13 11.1499H7" stroke="#ffffff" stroke-width="2.16"
stroke-linecap="round" stroke-linejoin="round"></Path><Path d="M2 11.1501V6.53009C2 4.49009 3.65 2.84009 5.69 2.84009H11.31C13.35 2.84009 15 4.11009 15 6.15009" stroke="#ffffff" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round">
</Path><Path d="M17.48 12.1999C16.98 12.6799 16.74 13.4199 16.94 14.1799C17.19 15.1099 18.11 15.6999 19.07 15.6999H20V17.1499C20 19.3599 18.21 21.1499 16 21.1499H6C3.79 21.1499 2 19.3599 2 17.1499V10.1499C2 7.9399 3.79 6.1499 6 6.1499H16C18.2 6.1499 20 7.9499 20 10.1499V11.5999H18.92C18.36 11.5999 17.85 11.8199 17.48 12.1999Z" stroke="#ffffff" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round">
</Path><Path d="M22 12.6201V14.6801C22 15.2401 21.5399 15.7001 20.9699 15.7001H19.0399C17.9599 15.7001 16.97 14.9101 16.88 13.8301C16.82 13.2001 17.0599 12.6101 17.4799 12.2001C17.8499 11.8201 18.36 11.6001 18.92 11.6001H20.9699C21.5399 11.6001 22 12.0601 22 12.6201Z" stroke="#ffffff" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round">
</Path></G></Svg>
)}

export const ArrowSlantDownIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="#000000" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
<G id="SVGRepo_iconCarrier"><G id="Complete"><G id="arrow-down-right"><G>
<Polyline data-name="Right" fill="none" id="Right-2" points="11.6 18.7 18.7 18.7 18.7 11.6"
stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"></Polyline>
<Line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"
x1="5.3" x2="17.1" y1="5.3" y2="17.1"></Line></G></G></G></G></Svg>
)}

export const SwapIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="none" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
<G id="SVGRepo_iconCarrier"><Path d="M6 19L3 16M3 16L6 13M3 16H11C12.6569 16 14 14.6569 14 13V12M10 12V11C10 9.34315 11.3431 8 13 8H21M21 8L18 11M21 8L18 5"
stroke="#070a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path></G></Svg>
)}

export const ProfileIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 20 20" fill="#000000" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier">
<G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><G id="Dribbble-Light-Preview"
transform="translate(-140.000000, -2159.000000)" fill="#ffffff"><G id="icons" transform="translate(56.000000, 160.000000)">
<Path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#fffffffffff]">
</Path></G></G></G></G></Svg>
)}

export const WavesIcon: React.FC<SvgProps> = (props) => {
return(
<Svg viewBox="0 0 24 24" fill="#000000" {...props}><G id="SVGRepo_bgCarrier" stroke-width="0"></G>
<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
<G id="SVGRepo_iconCarrier"><G id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<G id="Media" transform="translate(-960.000000, -144.000000)" fill-rule="nonzero">
<G id="voice_fill" transform="translate(960.000000, 144.000000)">
<Path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">
</Path><Path d="M12,2.5 C12.7796706,2.5 13.4204457,3.09488554 13.4931332,3.85553954 L13.5,4 L13.5,20 C13.5,20.8284 12.8284,21.5 12,21.5 C11.2203294,21.5 10.5795543,20.9050879 10.5068668,20.1444558 L10.5,20 L10.5,4 C10.5,3.17157 11.1716,2.5 12,2.5 Z M8,5.5 C8.82843,5.5 9.5,6.17157 9.5,7 L9.5,17 C9.5,17.8284 8.82843,18.5 8,18.5 C7.17157,18.5 6.5,17.8284 6.5,17 L6.5,7 C6.5,6.17157 7.17157,5.5 8,5.5 Z M16,5.5 C16.8284,5.5 17.5,6.17157 17.5,7 L17.5,17 C17.5,17.8284 16.8284,18.5 16,18.5 C15.1716,18.5 14.5,17.8284 14.5,17 L14.5,7 C14.5,6.17157 15.1716,5.5 16,5.5 Z M4,8.5 C4.82843,8.5 5.5,9.17157 5.5,10 L5.5,14 C5.5,14.8284 4.82843,15.5 4,15.5 C3.17157,15.5 2.5,14.8284 2.5,14 L2.5,10 C2.5,9.17157 3.17157,8.5 4,8.5 Z M20,8.5 C20.7796706,8.5 21.4204457,9.09488554 21.4931332,9.85553954 L21.5,10 L21.5,14 C21.5,14.8284 20.8284,15.5 20,15.5 C19.2203294,15.5 18.5795543,14.9050879 18.5068668,14.1444558 L18.5,14 L18.5,10 C18.5,9.17157 19.1716,8.5 20,8.5 Z" id="形状" fill="#070a1a">
</Path></G></G></G></G></Svg>
)}

export const FavIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={favicon} {...props}/>
)}

export const SolanaIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={solana} {...props}/>
)}

export const PdfIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={pfd} {...props}/>
)}

export const SvgIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={svg} {...props}/>
)}

export const AudioIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={mp3} {...props}/>
)}

export const VideoIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={mp4} {...props}/>
)}

export const ImageIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={png} {...props}/>
)}

export const FileIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={file} {...props}/>
)}

export const CodeIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={code} {...props}/>
)}

export const HtmlIcon: React.FC<ImageProps> = (props) => {
 return(
 <Image source={html} {...props}/>
)}
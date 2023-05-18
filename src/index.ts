import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import './index.less';
import './icons/index'
import { ReactRegister } from '@idm-modules/core/regModule/react'
import config from '../public/static/config.json'
new ReactRegister(config)
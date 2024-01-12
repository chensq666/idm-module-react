import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import './index.less';
import './icons/index'
import { ReactRegister } from './core/regComponent.js'
import config from '../public/static/config.json'
new ReactRegister(config)
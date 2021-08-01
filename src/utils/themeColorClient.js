// 注意自己项目里的引入路径
import client from 'webpack-theme-color-replacer/client';
import forElementUI from 'webpack-theme-color-replacer/forElementUI';
import config from '../config';

const curColor = config.themeColor;

// 动态切换主题色
export function changeThemeColor(newColor, flag = true) {
  const options = {
    newColors: [...forElementUI.getElementUISeries(newColor)],
    changeUrl(cssUrl) {
      if (process.env.NODE_ENV === 'production') {
        return `${config.baseUrl}/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
      }
      return `/${cssUrl}`;
    },
  };
  // 登录、注册模块等 flag 为false
  return client.changer.changeColor(options, Promise).then(() => {
    if (flag) localStorage.setItem('theme_color', newColor);
  });
}

export function initThemeColor() {
  const savedColor = localStorage.getItem('theme_color');
  if (savedColor) {
    // curColor = savedColor;
    changeThemeColor(savedColor);
  } else {
    changeThemeColor(curColor, false);
  }
}

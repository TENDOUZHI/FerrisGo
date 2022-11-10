use serde_json::{json, Value};
use std::{fmt::Error, fs::File, io::Write};

use super::ast::Navigator;

pub fn write_app_json(
    target_file: &mut File,
    route_name: Vec<String>,
    navigator: Navigator,
) -> Result<(), Error> {
    let mut list: Vec<Value> = vec![];
    for item in navigator.items {
        let nav = json!({
            "pagePath": item.path,
            "text": item.text,
            "iconPath": item.icon.unwrap(),
            "selectedIconPath": item.selected_icon.unwrap()
        });
        list.push(nav);
    }
    let json_str;
    if navigator.tab_bar_status {
        json_str = json!({
            "pages":route_name,
              "window":{
                "backgroundTextStyle":"light",
                "navigationBarBackgroundColor": "#fff",
                "navigationBarTitleText": "Weixin",
                "navigationBarTextStyle":"black"
              },
              "style": "v2",
              "sitemapLocation": "sitemap.json",
              "tabBar":{
                "color": navigator.font_color,
                "selectedColor": navigator.selected_color,
                "borderStyle": navigator.border_color,
                "list":list
              }
        });
    } else {
        json_str = json!({
            "pages":route_name,
              "window":{
                "backgroundTextStyle":"light",
                "navigationBarBackgroundColor": "#fff",
                "navigationBarTitleText": "Weixin",
                "navigationBarTextStyle":"black"
              },
              "style": "v2",
              "sitemapLocation": "sitemap.json"
        });
    }

    let json_body = json_str.to_string();
    target_file
        .write(json_body.as_bytes())
        .expect("occur at write json");
    Ok(())
}

pub fn write_project_config_json(target_file: &mut File) -> Result<(), Error> {
    let json_str = json!({
        "description": "项目配置文件",
        "packOptions": {
            "ignore": [
                {
                    "type": "file",
                    "value": ".eslintrc.js"
                }
            ]
        },
        "setting": {
            "urlCheck": true,
            "scopeDataCheck": false,
            "coverView": true,
            "es6": false,
            "postcss": true,
            "compileHotReLoad": false,
            "lazyloadPlaceholderEnable": false,
            "preloadBackgroundData": false,
            "minified": true,
            "autoAudits": false,
            "newFeature": false,
            "uglifyFileName": false,
            "uploadWithSourceMap": true,
            "useIsolateContext": false,
            "nodeModules": false,
            "enhance": true,
            "useMultiFrameRuntime": false,
            "useApiHook": false,
            "useApiHostProcess": false,
            "showShadowRootInWxmlPanel": true,
            "packNpmManually": false,
            "packNpmRelationList": [],
            "minifyWXSS": true,
            "disableUseStrict": false,
            "ignoreUploadUnusedFiles": true
        },
        "compileType": "miniprogram",
        "libVersion": "2.19.4",
        "projectname": "miniprogram-3",
        "debugOptions": {
            "hidedInDevtools": []
        },
        "scripts": {},
        "staticServerOptions": {
            "baseURL": "",
            "servePath": ""
        },
        "isGameTourist": false,
        "condition": {
            "search": {
                "list": []
            },
            "conversation": {
                "list": []
            },
            "game": {
                "list": []
            },
            "plugin": {
                "list": []
            },
            "gamePlugin": {
                "list": []
            },
            "miniprogram": {
                "list": []
            }
        }
    });
    let json_body = json_str.to_string();
    target_file
        .write(json_body.as_bytes())
        .expect("occur at write json");
    Ok(())
}

pub fn write_sitmap_json(target_file: &mut File) -> Result<(), Error> {
    let json_str = json!({
      "desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html",
      "rules": [{
      "action": "allow",
      "page": "*"
      }]
    });
    let json_body = json_str.to_string();
    target_file
        .write(json_body.as_bytes())
        .expect("occur at write json");
    Ok(())
}

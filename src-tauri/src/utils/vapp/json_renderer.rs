use image::io::Reader as ImageReader;
use image_base64::from_base64;
use serde_json::{json, Value};
use std::{
    fmt::Error,
    fs::File,
    io::{Cursor, Write},
};

use super::ast::Navigator;

pub fn write_app_json(
    target_file: &mut File,
    route_name: Vec<String>,
    navigator: Navigator,
    image_path: &str,
) -> Result<(), Error> {
    let json_str;
    if navigator.tab_bar_status {
        let mut list: Vec<Value> = vec![];
        for item in navigator.items {
            let path = format!("pages/{}/{}", item.path, item.path);
            let nav = json!({
                "pagePath": path,
                "text": item.text,
                "iconPath": write_icon(image_path, item.icon.unwrap(), item.id,"icon"),
                "selectedIconPath": write_icon(image_path, item.selected_icon.unwrap(), item.id,"selecticon")
            });
            list.push(nav);
        }
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
                "borderStyle": "black",
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
      }],
      "producedBy":"FerrisGo"
    });
    let json_body = json_str.to_string();
    target_file
        .write(json_body.as_bytes())
        .expect("occur at write json");
    Ok(())
}

fn write_icon(image_path: &str, src: String, id: i32, icon_type: &str) -> String {
    if src == "/src/assets/default.png".to_string() {
        let relative_path = "/images/default.png".to_string();
        relative_path
    } else {
        let bytes = from_base64(src.clone());
        let mut image_name = String::from("tabbar");
        image_name = format!("{}-{}-{}", image_name, icon_type, id);
        let image_full = format!("{}.png", image_name);
        let image = ImageReader::new(Cursor::new(bytes))
            .with_guessed_format()
            .expect("guessed format")
            .decode()
            .expect("decode");
        let path = format!("{}/images/{}", image_path, image_full);
        let relative_path = format!("/images/{}", image_full);
        image.save(path).unwrap();
        relative_path
    }
}

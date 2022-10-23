use std::{
    fs::{create_dir, remove_dir_all, File},
    io::Write,
    path::Path,
};

use serde_json::json;

use super::{
    ast::{VNode, Vapp},
    json_renderer::{write_app_json, write_project_config_json, write_sitmap_json},
    parser::parser,
    parser_wxss::parser_wxss,
};

pub fn parse_vapp(vapp: Vapp) {
    let project_name = vapp.project_name;
    let dev_path = format!("mini/{}", &project_name);
    let root_path = "mini/".to_string();
    let path = Path::new(&dev_path);
    let file_path = format!("{}", path.to_str().expect("file path"));
    remove_dir_all(&root_path).expect("occur at remove_dir_all");
    create_dir(&root_path).expect("create mini dir");
    create_dir(&path).expect("create_root_dir");
    create_pages_dir(&file_path);
    create_utils_dir(&file_path);
    // loop render pages
    let routes = vapp.routes;
    let mut route_name: Vec<String> = vec![];
    for page in routes {
        route_name.push(format!("pages/{}/{}",page.name.clone(),page.name.clone()));
        create_page(
            &file_path,
            &page.name,
            &page.vnode.expect("traverse routes"),
        )
    }
    create_basic_file(&file_path,route_name);
}

fn create_pages_dir(file_path: &str) {
    let path = format!("{}/pages", file_path);
    create_dir(path).expect("create_pages");
}

fn create_utils_dir(file_path: &str) {
    let path = format!("{}/utils", file_path);
    create_dir(path).expect("create_utils");
}

// initial the basic file of miniprogram
fn create_basic_file(file_path: &str, route_name: Vec<String>) {
    // initial file path
    let pathjs = format!("{}/app.js", file_path);
    let pathjson = format!("{}/app.json", file_path);
    let pathwxss = format!("{}/app.wxss", file_path);
    let path_sitmap_json = format!("{}/sitemap.json", file_path);
    let path_project_config = format!("{}/project.config.json", file_path);
    // initial file instance
    // let app_js = File::create(pathjs).unwrap();
    // let app_wxss = File::create(pathwxss).unwrap();
    File::create(pathjs).unwrap();
    File::create(pathwxss).unwrap();
    let mut app_json = File::create(pathjson).unwrap();
    let mut project_config = File::create(path_project_config).unwrap();
    let mut sitmap_json = File::create(path_sitmap_json).unwrap();
    // write json file
    write_app_json(&mut app_json, route_name).expect("write in app.json");
    write_project_config_json(&mut project_config).expect("write in project.config.json");
    write_sitmap_json(&mut sitmap_json).expect("write in sitmap.json");
}

fn create_page(file_path: &str, name: &str, data: &VNode) {
    let dir_path = format!("{}/pages/{}", &file_path, &name);
    create_dir(&dir_path).expect("create page dir");
    let path = format!("{}/{}", &dir_path, &name);
    write_js(&path);
    write_json(&path);
    write_wxml(&path, data);
    write_wxss(&path, data);
}

fn write_js(path: &str) {
    let page_path = format!("{}.js", path);
    let mut js = File::create(page_path).expect("create js file");
    // File::create(page_path).expect("create js file");
    let js_str = "const app = getApp()
    Page({})"
        .to_string();
    js.write_all(js_str.as_bytes()).expect("write js file");
}

fn write_json(path: &str) {
    let page_path = format!("{}.json", path);
    let mut json = File::create(page_path).expect("create json file");
    // File::create(page_path).expect("create json file");
    let json_str = json!({
      "usingComponents": {}
    });
    json.write_all(json_str.to_string().as_bytes())
        .expect("write page json");
}

fn write_wxml(path: &str, data: &VNode) {
    let page_path = format!("{}.wxml", path);
    let mut wxml = File::create(page_path).expect("create wxml file");
    let content = parser(data);
    wxml.write_all(content.as_bytes()).expect("writing wxml");
}

fn write_wxss(path: &str, data: &VNode) {
    let page_path = format!("{}.wxss", path);
    let content = parser_wxss(data);
    let mut wxss = File::create(page_path).expect("create wxss file");
    wxss.write_all(content.as_bytes()).expect("writint wxss");
}

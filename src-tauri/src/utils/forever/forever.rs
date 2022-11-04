use rfd::FileDialog;
use serde::Serialize;
use serde_json::Value;
use std::{
    fs::{self, File},
    io::Write,
    path::Path,
};

#[derive(Debug, Serialize)]
pub struct Response {
    status: bool,
    msg: String,
}

// impl InvokeResponder for Response {

// }

#[tauri::command]
pub async fn read_path_fn() -> Vec<String> {
    let json_value: Value = read_json_value();
    let mut cach_path: Vec<String> = vec![];
    for file_path in json_value["file_path"].as_array() {
        for i in file_path {
            cach_path.push(String::from(i.as_str().unwrap()));
        }
    }
    return cach_path;
}

#[tauri::command]
pub async fn last_file_path() -> String {
    let json_value: Value = read_json_value();
    let value = &json_value["last_file"];
    String::from(value.as_str().unwrap())
}

#[tauri::command]
pub fn select_file() {
    let files = FileDialog::new().add_filter("name", &["txt"]).pick_file();
    match files {
        Some(path) => println!("{:?}", path),
        None => println!("target object is null"),
    }
}

#[tauri::command]
pub async fn save_file_data(data: String, project_name: String) -> Result<String, String> {
    let path = format!("C:/Users/HP/Documents/大三上/{}.FES", project_name);
    let file = File::create(path);
    match file {
        Ok(mut v) => {
            v.write_all(data.as_bytes()).expect("save file");
            Ok("save data successfully".to_string())
        }
        Err(_) => Err("failed to save data".to_string()),
    }
}

#[tauri::command]
pub async fn read_file_data(file_path: String) -> String {
    let path = Path::new(file_path.as_str());
    let content = fs::read_to_string(path);
    match content {
        Ok(v) => v,
        Err(_) => "failed to read file".to_string(),
    }
}

#[tauri::command]
pub async fn open_doc_browser()-> Result<String, String> {
    let path = "file:///D:/myCode/vitepress/FerrisDoc/docs/.vitepress/dist/index.html";
    match webbrowser::open(path) {
        Ok(_) => Ok("open in browser successfully".to_string()),
        Err(_) => Err("failed to open document".to_string())
    } 
}

fn read_json_value() -> Value {
    let json_path = "../caches.json";
    let json_file = fs::read_to_string(json_path).unwrap();
    let json_value: Value = serde_json::from_str(&json_file).expect("JSON was not well-formatted");
    json_value
}

use rfd::FileDialog;
use serde::{Deserialize, Serialize};
use serde_json::to_string;
use std::{
    fs::{self, remove_file, File},
    io::Write,
    path::Path,
};

#[derive(Debug, Serialize, Deserialize)]
pub struct Caches {
    file_path: Vec<String>,
    last_file: String,
}

impl Caches {
    fn update_last_file(&self, path: String) -> Self {
        Self {
            file_path: self.file_path.clone(),
            last_file: path,
        }
    }
}

#[tauri::command]
pub async fn read_path_fn() -> Vec<String> {
    let json_value: Caches = read_json_value();
    json_value.file_path
}

#[tauri::command]
pub async fn last_file_path() -> String {
    let json_value: Caches = read_json_value();
    let value = json_value.last_file;
    value
}

#[tauri::command]
pub fn select_file() {
    let files = FileDialog::new().add_filter("name", &["FES"]).pick_folder();
    match files {
        Some(path) => println!("{:?}", path),
        None => println!("target object is null"),
    }
}

#[tauri::command]
pub async fn create_project() -> Result<String, String> {
    let path_buf = FileDialog::new().add_filter("name", &["FES"]).pick_folder();
    match path_buf {
        Some(path) => {
            let file_path = format!("{}/新建Ferris项目.FES", path.to_string_lossy());
            let file = File::create(file_path);
            match file {
                Ok(_) => Ok("新建项目成功".to_string()),
                Err(e) => Err(format!("{:?}", e)),
            }
        }
        None => Err("新建项目失败".to_string()),
    }
}

#[tauri::command]
pub async fn save_file_data(data: String, project_name: String) -> Result<String, String> {
    let path = format!("C:/Users/HP/Documents/大三上/{}.FES", project_name);
    // try open the file
    // if is not existed create a new file
    // if existed recreated it
    let new_file = File::open(path.clone());
    match new_file {
        Ok(_) => {
            if let Ok(mut file) = File::create(path.clone()) {
                if let Ok(_) = file.write_all(data.as_bytes()) {
                    Ok("save data successfully".to_string())
                } else {
                    Err("failed to save data".to_string())
                }
            } else {
                Err("failed to recreate file".to_string())
            }
        }
        Err(_) => {
            let file = File::create(path.clone());
            match file {
                Ok(mut v) => {
                    v.write_all(data.as_bytes()).expect("save file");
                    let json_value: Caches = read_json_value();
                    let value = json_value.last_file.clone();
                    remove_file(value).expect("remove formal file");
                    let new_json_value = json_value.update_last_file(path);
                    let write_res = write_json_value(new_json_value);
                    match write_res {
                        Ok(_) => Ok("save data successfully".to_string()),
                        Err(e) => Err(e),
                    }
                }
                Err(_) => Err("failed to save data".to_string()),
            }
        }
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
pub async fn open_doc_browser() -> Result<String, String> {
    let path = "file:///D:/myCode/vitepress/FerrisDoc/docs/.vitepress/dist/index.html";
    match webbrowser::open(path) {
        Ok(_) => Ok("open in browser successfully".to_string()),
        Err(_) => Err("failed to open document".to_string()),
    }
}

fn read_json_value() -> Caches {
    let json_path = "../caches.json";
    let json_file = fs::read_to_string(json_path).unwrap();
    let json_value: Caches = serde_json::from_str(&json_file).expect("JSON was not well-formatted");
    json_value
}

fn write_json_value(data: Caches) -> Result<(), String> {
    let json_path = "../caches.json";
    let json_file = File::create(json_path);
    let json_string = to_string(&data).unwrap();
    match json_file {
        Ok(mut file) => match file.write_all(json_string.as_bytes()) {
            Ok(_) => Ok(()),
            Err(e) => {
                println!("failed to write cache json,{}", e);
                Err("failed to write cache json".to_string())
            }
        },
        Err(e) => Err(format!("{:?}", e)),
    }
}

use rfd::FileDialog;
use serde::{Deserialize, Serialize};
use serde_json::to_string;
use std::{
    fs::{self, File},
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
    fn update_file_path(&mut self, path: String) -> Self {
        let mut file_path = self.file_path.clone();
        file_path.insert(0, path);
        Self {
            file_path,
            last_file: self.last_file.clone(),
        }
    }
    fn update_sequence(&mut self, path: String) -> Self {
        let mut cache_file_path = self.file_path.clone();
        let mut cache_path = String::from("");
        for (i, p) in self.file_path.iter().enumerate() {
            if path == *p {
                cache_path = cache_file_path.remove(i);
                break;
            }
        }
        cache_file_path.insert(0, cache_path);
        Self {
            file_path: cache_file_path,
            last_file: self.last_file.clone(),
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
pub fn select_file() -> Result<String, ()> {
    let files = FileDialog::new().add_filter("name", &["FES"]).pick_folder();
    match files {
        Some(path) => Ok(path.to_string_lossy().to_string()),
        None => Err(()),
    }
}

#[tauri::command]
pub async fn create_project(path: String, project_name: String) -> Result<String, String> {
    let file_path = format!("{}\\{}.FES", path, project_name);
    let file = File::create(file_path.clone());
    match file {
        Ok(_) => match read_file_data(file_path.clone()).await {
            Ok(_) => {
                let json_value = read_json_value().update_file_path(file_path);
                match write_json_value(json_value) {
                    Ok(_) => Ok("创建项目成功".to_string()),
                    Err(e) => Err(e),
                }
            }
            Err(e) => Err(e),
        },
        Err(_) => Err("创建项目失败".to_string()),
    }
}

#[tauri::command]
pub async fn save_file_data(data: String) -> Result<String, String> {
    let path = read_json_value().last_file;
    let file = File::create(path);
    match file {
        Ok(mut file) => {
            if let Ok(_) = file.write_all(data.as_bytes()) {
                Ok("save successfully".to_string())
            } else {
                Err("failed to save file".to_string())
            }
        }
        Err(_) => Err("failed to save file".to_string()),
    }
}

#[tauri::command]
pub async fn read_file_data(file_path: String) -> Result<String, String> {
    let path = Path::new(file_path.as_str());
    let content = fs::read_to_string(path);
    match content {
        Ok(v) => {
            let last_path = read_json_value();
            let new_path = last_path.update_last_file(file_path.clone()).update_sequence(file_path);
            // let json_value = new_path;
            match write_json_value(new_path) {
                Ok(_) => Ok(v),
                Err(e) => Err(e),
            }
        }
        Err(_) => Err("failed to read file".to_string()),
    }
}

#[tauri::command]
pub async fn open_doc_browser() -> Result<String, String> {
    let path = "https://tendouzhi.github.io/FerrisGo/";
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

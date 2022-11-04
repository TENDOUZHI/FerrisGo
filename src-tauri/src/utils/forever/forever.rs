use rfd::FileDialog;
use serde_json::Value;
use std::{
    fs::{self, File},
    io::Write,
    path::Path,
};

#[tauri::command]
pub async fn read_path_fn() -> Vec<String> {
    let json_path = "../caches.json";
    let json_file = fs::read_to_string(json_path).unwrap();
    let json_value: Value = serde_json::from_str(&json_file).expect("JSON was not well-formatted");
    let mut cach_path: Vec<String> = vec![];
    for file_path in json_value["file_path"].as_array() {
        for i in file_path {
            // let value = i[&name].clone();
            // println!("{:?}",i.as_str().unwrap());
            cach_path.push(String::from(i.as_str().unwrap()));
            // if value != Value::Null {
            //     read_file_data(value.as_str().unwrap());
            //     break;
            // }
        }
    }
    return cach_path;
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
pub async fn save_file_data(data: String, project_name: String) -> String {
    let path = format!("C:/Users/HP/Documents/大三上/{}.txt", project_name);
    let file = File::create(path);
    match file {
        Ok(mut v) => {
            v.write_all(data.as_bytes()).expect("save file");
            "save data successfully".to_string()
        }
        Err(_) => "failed to save data".to_string(),
    }
}

fn read_file_data(file_path: &str) {
    let path = Path::new(file_path);
    println!("{:?}", file_path);
    let content = fs::read_to_string(path);
    match content {
        Ok(v) => {
            println!("{:?}", v)
        }
        Err(_) => println!("error in file path"),
    }
}

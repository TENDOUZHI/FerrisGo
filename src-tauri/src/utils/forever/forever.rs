use serde_json::Value;
use std::{fs, path::Path};

#[tauri::command]
pub async fn read_path_fn(name: String) {
    let json_path = "../caches.json";
    let json_file = fs::read_to_string(json_path).unwrap();
    let json_value: Value = serde_json::from_str(&json_file).expect("JSON was not well-formatted");
    for file_path in json_value["file_path"].as_array() {
        for i in file_path {
            let value = i[&name].clone();
            // println!("{:?}",i);
            if value != Value::Null {
                read_file_data(value.as_str().unwrap());
                break;
            }
        }
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

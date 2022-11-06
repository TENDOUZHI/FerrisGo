use std::{
    fs::{self, File},
    io::Write,
};

use serde::{de::Error, Deserialize, Serialize};
use serde_json::to_string;

use crate::utils::vapp::ast::VNode;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Undo {
    history: Vec<VNode>,
}

impl Undo {
    fn new() -> Self {
        let json_path = "../undo.json";
        let json_file = fs::read_to_string(json_path).unwrap();
        let json_value: Undo =
            serde_json::from_str(&json_file).expect("JSON was not well-formatted");
        json_value
    }

    fn write(self) -> Result<(), ()> {
        let json_path = "../undo.json";
        let json_file = File::create(json_path);
        let json_string = to_string(&self).unwrap();
        match json_file {
            Ok(mut file) => {
                if let Ok(_) = file.write_all(json_string.as_bytes()) {
                    Ok(())
                } else {
                    Err(())
                }
            }
            Err(_) => Err(()),
        }
    }

    fn newdo(&mut self, new_operate: VNode) -> Self {
        self.history.push(new_operate);
        Self {
            history: self.history.clone(),
        }
    }
}

fn write_json_value(data: Undo) -> Result<(), ()> {
    let json_path = "../undo.json";
    let json_file = File::create(json_path);
    let json_string = to_string(&data).unwrap();
    match json_file {
        Ok(mut file) => {
            if let Ok(_) = file.write_all(json_string.as_bytes()) {
                Ok(())
            } else {
                Err(())
            }
        }
        Err(_) => Err(()),
    }
}

#[tauri::command]
pub async fn save_operate(new_operate: VNode) {
    let mut undo = Undo::new();
    undo.newdo(new_operate);
   match undo.write() {
       Ok(_) => todo!(),
       Err(_) => todo!()
   }
}

#[tauri::command]
pub async fn undo_operate() {}

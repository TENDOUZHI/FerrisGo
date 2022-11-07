use std::{
    fs::{self, File},
    io::Write,
};

use serde::{ Deserialize, Serialize};
use serde_json::to_string;

use crate::utils::vapp::ast::VNode;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Undo {
    history: Vec<VNode>,
    buffer: Option<VNode>
}

impl Undo {
    fn new() -> Self {
        let json_path = "../undo.json";
        let json_file = fs::read_to_string(json_path).unwrap();
        let json_value: Undo =
            serde_json::from_str(&json_file).expect("JSON was not well-formatted");
        json_value
    }

    fn flush(&mut self) {
        self.history = vec![];
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

    fn newdo(&mut self, new_operate: VNode)  {
        self.history.push(self.buffer.clone().unwrap());
        self.buffer = Some(new_operate);
    }
    fn undo(&mut self) -> VNode {
        let value = self.history.pop();
        value.unwrap()
    }
}

#[tauri::command]
pub async fn flush_operate() -> Result<(),()> {
    let mut undo = Undo::new();
    undo.flush();
    match undo.write() {
        Ok(_) => Ok(()),
        Err(_) => Err(())
    }
}

#[tauri::command]
pub async fn save_operate(new_operate: VNode) -> Result<(),()> {
    let mut undo = Undo::new();
    undo.newdo(new_operate);
   match undo.write() {
       Ok(_) => Ok(()),
       Err(_) => Err(())
   }
}

#[tauri::command]
pub async fn undo_operate() -> Result<VNode,()> {
    let mut undo = Undo::new();
    let value = undo.undo();
    match undo.write() {
        Ok(_) => Ok(value),
        Err(_) => Err(())
    }
}

use std::{
    fs::{self, File},
    io::Write,
};

use serde::{Deserialize, Serialize};
use serde_json::to_string;

use crate::utils::{utilities::JsonOperate, vapp::ast::VNode};

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Undo {
    history: Vec<VNode>,
    buffer: Option<VNode>,
    backup: VNode,
}

impl JsonOperate for Undo {
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
}
impl Undo {
    fn flush(&mut self) {
        self.history = vec![];
        self.history.push(self.backup.clone())
    }
    fn newdo(&mut self, new_operate: VNode) {
        self.history.push(self.buffer.clone().unwrap());
        self.buffer = Some(new_operate);
    }
    fn undo(&mut self) -> Result<VNode, ()> {
        if self.history.len() > 1 {
            let value = self.history.pop();
            self.buffer = value.clone();
            Ok(value.unwrap())
        } else {
            Err(())
        }
    }
}

#[tauri::command]
pub async fn flush_operate() -> Result<(), ()> {
    let mut undo = Undo::new();
    undo.flush();
    match undo.write() {
        Ok(_) => Ok(()),
        Err(_) => Err(()),
    }
}

#[tauri::command]
pub async fn save_operate(new_operate: VNode) -> Result<(), ()> {
    let mut undo = Undo::new();
    undo.newdo(new_operate);
    match undo.write() {
        Ok(_) => Ok(()),
        Err(_) => Err(()),
    }
}

#[tauri::command]
pub async fn undo_operate() -> Result<VNode, ()> {
    let mut undo = Undo::new();
    match undo.undo() {
        Ok(val) => match undo.write() {
            Ok(_) => Ok(val),
            Err(_) => Err(()),
        },
        Err(_) => Err(()),
    }
}

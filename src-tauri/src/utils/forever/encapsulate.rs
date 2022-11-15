use std::{
    fs::{self, File},
    io::Write,
};

use serde::{Deserialize, Serialize};
use serde_json::to_string;

use crate::utils::{utilities::JsonOperate, vapp::ast::VNode};

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Encapsulate {
    elements: Vec<Ene>,
    record: i32,
}
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Ene {
    id: i32,
    name: String,
    vnode: VNode,
}

impl JsonOperate for Encapsulate {
    fn new() -> Self {
        let json_path = "../encpe.json";
        let json_file = fs::read_to_string(json_path).unwrap();
        let json_value: Encapsulate =
            serde_json::from_str(&json_file).expect("JSON was not well-formatted");
        json_value
    }

    fn write(self) -> Result<(), ()> {
        let json_path = "../encpe.json";
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

impl Encapsulate {
    fn new_element(&mut self, element: VNode, name: String) -> Result<(), ()> {
        let ene = Ene {
            id: self.record,
            name,
            vnode: element,
        };
        self.elements.push(ene);
        self.record += 1;
        Ok(())
    }

    fn remove_element(&mut self, id: i32) -> Result<(), ()> {
        for el in &self.elements {
            if el.id == id {
                self.elements.remove(id as usize);
                break;
            }
        }
        Ok(())
    }
}

#[tauri::command]
pub fn encapsulate_element(element: VNode, name: String) -> Result<(), ()> {
    let mut encpe = Encapsulate::new();
    if let Ok(_) = encpe.new_element(element, name) {
        match encpe.write() {
            Ok(_) => Ok(()),
            Err(_) => Err(()),
        }
    } else {
        Err(())
    }
}

#[tauri::command]
pub fn remove_encapsulate_element(id: i32) -> Result<(), ()> {
    let mut encpe = Encapsulate::new();
    if let Ok(_) = encpe.remove_element(id) {
        match encpe.write() {
            Ok(_) => Ok(()),
            Err(_) => Err(()),
        }
    } else {
        Err(())
    }
}

#[tauri::command]
pub fn show_encapsulate_element() -> Vec<Ene> {
    let encpe = Encapsulate::new();
    encpe.elements
}

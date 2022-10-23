#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use crate::utils::{atoms::tes::hello2,vapp::vapp_route::vapp};

mod utils;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, hello2,vapp])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

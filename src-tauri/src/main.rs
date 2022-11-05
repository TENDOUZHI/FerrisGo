#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use tauri::Manager;

use crate::utils::{atoms::tes::hello2, forever::forever::{read_path_fn, select_file, save_file_data, read_file_data, last_file_path, open_doc_browser, create_project}, vapp::vapp_route::vapp};

mod utils;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    // Show main window
    window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            tauri::async_runtime::spawn(async move {
                std::thread::sleep(std::time::Duration::from_secs(5));
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            close_splashscreen,
            hello2,
            vapp,
            save_file_data,
            read_file_data,
            read_path_fn,
            select_file,
            last_file_path,
            open_doc_browser,
            create_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


#[tauri::command]
pub async fn hello2() -> String {
    "hello react".to_string()
}
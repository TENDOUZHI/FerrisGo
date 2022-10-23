// use actix_files::NamedFile;
// use actix_web::{post, web::Json, Result};
use std::path::Path;

use crate::utils::vapp::{ast::Vapp, compress::compress, renderer::parse_vapp};

// #[post("/vapp")]
#[tauri::command]
pub async fn vapp(info: Vapp) {
    let project_name = &info.project_name.clone();
    let raw_path = format!("mini/{}.zip", &project_name);
    let path = Path::new(&raw_path);
    // parse_vapp(info.into_inner());
    // compress(project_name);
    // Ok(NamedFile::open(path).expect("return file"))
}

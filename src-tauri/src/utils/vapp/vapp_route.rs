
use rfd::FileDialog;

use crate::utils::vapp::{ast::Vapp, renderer::parse_vapp};

// #[post("/vapp")]
#[tauri::command]
pub async fn vapp(info: Vapp) -> Result<String,String> {
    // println!("{:?}",info);
    // println!("{:?}",info.routes[0].vnode.as_ref().unwrap().children[0].props.as_ref().unwrap());
    // println!("--------------");
    // let project_name = &info.project_name.clone();
    // let raw_path = format!("mini/{}.zip", &project_name);
    // let path = Path::new(&raw_path);
    let folder = FileDialog::new().add_filter("name", &["FES"]).pick_folder();
    if let Some(path) = folder {
        parse_vapp(info, path.to_str().unwrap());
        Ok("export project successfully".to_string())
    } else {
        Err("failed to export project".to_string())
    }
    
    // compress(project_name);
    // Ok(NamedFile::open(path).expect("return file"))
    
}

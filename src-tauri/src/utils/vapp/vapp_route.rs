
use crate::utils::vapp::{ast::Vapp, renderer::parse_vapp};

// #[post("/vapp")]
#[tauri::command]
pub async fn vapp(info: Vapp) {
    // println!("{:?}",info);
    // println!("{:?}",info.routes[0].vnode.as_ref().unwrap().children[0].props.as_ref().unwrap());
    // println!("--------------");
    // let project_name = &info.project_name.clone();
    // let raw_path = format!("mini/{}.zip", &project_name);
    // let path = Path::new(&raw_path);
    parse_vapp(info);
    // compress(project_name);
    // Ok(NamedFile::open(path).expect("return file"))
}

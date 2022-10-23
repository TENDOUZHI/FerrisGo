use std::{
    fs::{ File},
    io::{Read, Seek, Write},
    path::Path,
};
use walkdir::{WalkDir,DirEntry};
use zip::{write::FileOptions, CompressionMethod};

pub fn compress(project_name: &str) {
    let src_path = Path::new("mini/New Project");
    let zip_path = format!("mini/{}.zip",project_name);
    let target = Path::new(&zip_path);
    let zip_result = compress_dir(src_path, target);
    if let Ok(()) = zip_result{
        println!("压缩完成！")
    }else {
        println!("压缩出错：{:?}",zip_result)
    }
}

fn compress_dir(src_path: &Path, target: &Path) -> Result<(), Box<dyn std::error::Error>> {
    let zip_file = File::create(target).expect("compress_dir create file");
    let dir = WalkDir::new(src_path);
    let prefix = src_path
        .parent()
        .map_or_else(|| "/", |p| p.to_str().unwrap());
    zip_dir(
        &mut dir.into_iter().filter_map(|e| e.ok()),
        prefix,
        zip_file,
    )?;
    Ok(())
}

fn zip_dir<T>(
    it: &mut dyn Iterator<Item = DirEntry>,
    prefix: &str,
    writer: T,
) -> zip::result::ZipResult<()>
where
    T: Write + Seek,
{
    let mut zip = zip::ZipWriter::new(writer);
    let options = FileOptions::default()
        .compression_method(CompressionMethod::Bzip2)
        .unix_permissions(0o755);
    let mut buffer = Vec::new();
    for entry in it {
        let path = entry.path();
        let name = path.strip_prefix(Path::new(prefix)).unwrap();
        if path.is_file() {
            // println!("adding file {:?} as {:?} ...", path, name);
            zip.start_file(name.to_string_lossy(), options).unwrap();
            let mut f = File::open(path).unwrap();
            f.read_to_end(&mut buffer).unwrap();
            zip.write_all(&buffer).unwrap();
            buffer.clear();
        } else if name.as_os_str().len() != 0 {
            zip.add_directory(name.to_string_lossy(), options).unwrap();
        }
    }
    zip.finish().unwrap();
    Ok(())
}

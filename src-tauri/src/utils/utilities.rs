pub trait JsonOperate {
    fn new() -> Self;
    fn write(self) -> Result<(),()>;
}